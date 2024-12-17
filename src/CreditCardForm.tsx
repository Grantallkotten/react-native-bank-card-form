import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import { colors, sizes } from './styles/theme';
import Card from './components/card/Card';
import PickerComponent from './components/PickerComponent';
import { useState, useEffect } from 'react';
import { ExpirationProvider } from './components/ExpirationContext';

type Props = {
  onCardNumberChange?: (value: string) => void;
  onCardNameChange?: (value: string) => void;
  onExpirationMonthChange?: (value: string) => void;
  onExpirationYearChange?: (value: string) => void;
  onCVVChange?: (value: string) => void;
  // style?: { [key: string]: string };
};

export default function CreditCardForm({
  onCardNumberChange,
  onCardNameChange,
  onCVVChange,
  onExpirationMonthChange,
  onExpirationYearChange,
}: Props) {
  const cardNameInit = 'FULL NAME';
  const cvvInit = '';
  const carNumberInit = '';

  const [inFocus, setInFocus] = useState<string>('');

  const [cardNumber, setCardNumber] = useState<string>(carNumberInit);
  const [cardNumberInputValue, setCardNumberInputValue] = useState<string>('');
  const [cardNumberArray, setCardNumberArray] = useState<Array<string>>([]);

  const [cardName, setCardName] = useState<string>(cardNameInit);
  const [cardNameInputValue, setCardNameInputValue] = useState<string>('');

  const [cvvNumbers, setCVVNumbers] = useState<string>(cvvInit);
  const [cvvNumberInputValue, setCVVNumberInputValue] = useState<string>('');

  const [randBackgrounImageIndex] = useState<string>(
    (Math.floor(Math.random() * 21) + 1).toString()
  );

  useEffect(() => {
    onCardNumberChange?.(cardNumberInputValue);
  }, [cardNumberInputValue, onCardNumberChange]);

  useEffect(() => {
    onCardNameChange?.(cardNameInputValue);
  }, [cardNameInputValue, onCardNameChange]);

  useEffect(() => {
    onCVVChange?.(cvvNumberInputValue);
  }, [cvvNumberInputValue, onCVVChange]);

  const handleTextChange = (
    text: string,
    textInit: string,
    stateInputUpdater: React.Dispatch<React.SetStateAction<string>>,
    stateUpdater: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const filteredText = text.replace(/[^a-zA-ZÅÄÖåäö\s]/g, '').toUpperCase();

    stateInputUpdater(filteredText);
    stateUpdater(filteredText ? filteredText : textInit);
  };

  const handleNumberChange = (
    number: string,
    stateInputUpdater: React.Dispatch<React.SetStateAction<string>>,
    stateUpdater: React.Dispatch<React.SetStateAction<string>>,
    maxNumbers?: number
  ) => {
    let filteredText = number.replace(/[^0-9]/g, '');
    if (maxNumbers) filteredText = filteredText.slice(0, maxNumbers);

    stateInputUpdater(filteredText);
    stateUpdater(filteredText);
  };

  const setFocus = (areaName: string) => {
    setInFocus(areaName);
  };

  useEffect(() => {
    const numberString = cardNumber !== '' ? cardNumber : carNumberInit;

    // Split the number string into chunks of 4 digits
    const chunks: string[] = numberString.match(/.{1,4}/g) || [];

    while (chunks.length < 4) {
      chunks.push('####');
    }

    const paddedChunks = chunks.map((chunk) => chunk.padEnd(4, '#'));

    setCardNumberArray(paddedChunks);
  }, [cardNumber]);

  return (
    <ExpirationProvider>
      <View style={styles.wrapper}>
        <Card
          inFocus={inFocus}
          cardName={cardName}
          cvvText={cvvNumbers}
          cardNumbers={cardNumberArray}
          backgroundImageIndex={randBackgrounImageIndex}
        />
        <View style={styles.container}>
          <View style={styles.singleInputFieldContainer}>
            <Text style={styles.singleInputFieldText}>Card Number</Text>
            <TextInput
              style={styles.singleInputField}
              value={cardNumberInputValue}
              onChangeText={(value) =>
                handleNumberChange(
                  value,
                  setCardNumberInputValue,
                  setCardNumber,
                  16
                )
              }
              onFocus={() => setFocus('cardNumber')}
              onBlur={() => setFocus('')}
              // keyboardType="numeric"
            />
          </View>
          <View style={styles.singleInputFieldContainer}>
            <Text style={styles.singleInputFieldText}>Card Name</Text>
            <TextInput
              style={styles.singleInputField}
              value={cardNameInputValue}
              onChangeText={(value) =>
                handleTextChange(
                  value,
                  cardNameInit,
                  setCardNameInputValue,
                  setCardName
                )
              }
              onFocus={() => setFocus('cardHolder')}
              onBlur={() => setFocus('')}
            />
          </View>
          <View style={styles.rowInputFieldContainer}>
            <View style={styles.expirationDatesInputsContainer}>
              <Text style={styles.singleInputFieldText}>Expiration Date</Text>
              <PickerComponent
                onMonthChange={(value) => onExpirationMonthChange?.(value)}
                onYearChange={(value) => onExpirationYearChange?.(value)}
                onFocus={() => setFocus('expires')}
                onBlur={() => setFocus('')}
              />
            </View>
            <View style={styles.cvvContainer}>
              <Text style={styles.singleInputFieldText}>CVV</Text>
              <TextInput
                style={styles.singleInputField}
                value={cvvNumberInputValue}
                onChangeText={(value) =>
                  handleNumberChange(
                    value,
                    setCVVNumberInputValue,
                    setCVVNumbers,
                    3
                  )
                }
                onFocus={() => setFocus('cvv')}
                onBlur={() => setFocus('')}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ExpirationProvider>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    width: 350,
    height: 400,
    marginVertical: 4,
    padding: 20,
    backgroundColor: colors.container,
    borderRadius: 2 * sizes.borderRadius,
    justifyContent: 'flex-end',

    // phone
    elevation: 10,

    // web
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 40,
  },

  singleInputFieldContainer: {
    marginVertical: sizes.marginVertical,
  },

  singleInputFieldText: {
    color: colors.text,
    fontSize: 14,
  },

  singleInputField: {
    backgroundColor: colors.container,
    borderWidth: sizes.borderWidth,
    borderRadius: sizes.borderRadius,
    borderColor: colors.border,
    paddingHorizontal: sizes.paddingHorizontal,
    paddingVertical: sizes.paddingVertical,
    fontSize: sizes.fontSizeInputFields,
  },

  rowInputFieldContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: sizes.marginVertical,
  },

  expirationDatesInputsContainer: {
    flex: 0.67,
  },

  expirationDatesInputs: {
    flexDirection: 'row',
    gap: 8,
    overflow: 'hidden',
  },

  cvvContainer: {
    flex: 0.33,
  },

  button: {
    backgroundColor: colors.button,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: sizes.borderRadius,
    padding: 10,
    marginVertical: sizes.marginVertical,
  },

  buttonText: {
    fontSize: 18,
    color: colors.buttonText,
  },
});
