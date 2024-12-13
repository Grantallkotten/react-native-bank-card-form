import { useState } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { colors, sizes } from '../styles/theme';
import { useExpiration } from './ExpirationContext';

interface PickerComponentProps {
  onFocus?: () => void;
  onBlur?: () => void;
}

const PickerComponent: React.FC<PickerComponentProps> = ({
  onFocus,
  onBlur,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeSelection, setActiveSelection] = useState<'month' | 'year'>(
    'month'
  );

  const { month, updateMonth, year, updateYear } = useExpiration();

  const months = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, '0')
  );
  const years = Array.from({ length: 7 }, (_, i) =>
    (Number(new Date().getFullYear()) + i).toString()
  );

  const handleSelect = (value: string) => {
    if (activeSelection === 'month') {
      updateMonth(value);
    } else {
      updateYear(value);
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    onBlur?.();
  };

  const handleButtonPress = (selection: 'month' | 'year') => {
    setActiveSelection(selection);
    setIsModalVisible(true);
    onFocus?.();
  };

  return (
    <View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress('month')}
        >
          <Text style={styles.buttonText}>{month}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress('year')}
        >
          <Text style={styles.buttonText}>{year}</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={handleModalClose}
      >
        <Pressable style={styles.modalOverlay} onPress={handleModalClose}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Select {activeSelection === 'month' ? 'Month' : 'Year'}
              </Text>
              <TouchableOpacity onPress={handleModalClose}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.optionsContainer}>
              {(activeSelection === 'month' ? months : years).map((value) => (
                <TouchableOpacity
                  key={value}
                  style={[
                    styles.option,
                    value === (activeSelection === 'month' ? month : year) &&
                      styles.selectedOption,
                  ]}
                  onPress={() => {
                    handleSelect(value);
                    handleModalClose();
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      value === (activeSelection === 'month' ? month : year) &&
                        styles.selectedOptionText,
                    ]}
                  >
                    {value}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
  },

  button: {
    flex: 0.5,
    backgroundColor: colors.container,
    borderWidth: sizes.borderWidth,
    borderRadius: sizes.borderRadius,
    borderColor: colors.border,
    paddingHorizontal: sizes.paddingHorizontal,
    paddingVertical: sizes.paddingVertical,
    fontSize: sizes.fontSizeInputFields,
  },

  buttonText: {},

  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  modalContent: {
    backgroundColor: colors.container,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    maxHeight: '50%',
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },

  closeButton: {
    fontSize: 20,
    padding: 4,
  },

  optionsContainer: {
    padding: 16,
  },

  option: {
    padding: 12,
    borderRadius: sizes.borderRadius,
    marginBottom: 8,
  },

  selectedOption: {
    backgroundColor: colors.container,
  },

  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },

  selectedOptionText: {
    fontWeight: '600',
  },
});

export default PickerComponent;
