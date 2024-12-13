import { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Text, Image } from 'react-native';
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';

import { colors, sizes } from '../../styles/theme';
import useImageWidth from '../../hooks/useImageWidth';
import { getCardType, getLogo } from '../../util/cardLogoUtils';
import { getBackgroundImage } from '../../util/backgroundImageUtils';

interface CardBackProps {
  cvvText?: string;
  card4FirstNumbers?: string;
  backgroundImageIndex?: string;
}

export default function CardBack({
  cvvText = '',
  card4FirstNumbers = '',
  backgroundImageIndex = '21',
}: CardBackProps) {
  const backgroundImage = getBackgroundImage(backgroundImageIndex);

  const logoHeight = 40;
  const logoSource = getLogo(getCardType(card4FirstNumbers));
  const logoWidth = useImageWidth(logoSource, logoHeight);

  const [cvvTextArray, setCVVTextArray] = useState<Array<string>>([]);

  useEffect(() => {
    setCVVTextArray(cvvText.split(''));
  }, [cvvText]);

  return (
    <ImageBackground source={backgroundImage} style={styles.card}>
      <View style={styles.contentContainer}>
        <View style={styles.containerTop}>
          <View style={styles.blackBar} />
        </View>
        <View style={styles.containerCenter}>
          <View style={styles.cvvTextContainer}>
            <Text style={styles.cvvText}>CVV</Text>
          </View>
          <View style={styles.cvvInputContainer}>
            {cvvTextArray.map((char, index) => (
              <Animated.Text
                key={index + '-' + char}
                entering={ZoomIn}
                exiting={cvvTextArray.length === 1 ? ZoomOut : undefined}
              >
                {char}
              </Animated.Text>
            ))}
          </View>
        </View>
        <View style={styles.containerBottom}>
          <View>
            <Image
              source={logoSource}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                height: logoHeight,
                width: logoWidth,
                maxWidth: 80,
              }}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    paddingVertical: 16,
    transform: [{ scaleX: -1 }],
  },

  card: {
    flex: 1,
    transform: [{ scaleX: -1 }],
  },

  containerTop: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  blackBar: {
    backgroundColor: '#0b0f14',
    height: 40,
    marginBottom: 5,
  },

  containerCenter: {
    flex: 1,
  },

  cvvTextContainer: {
    alignItems: 'flex-end',
  },

  cvvText: {
    marginHorizontal: 8,
    paddingHorizontal: 8,
    fontSize: 12,
    color: colors.cardText,
  },

  cvvInputContainer: {
    backgroundColor: 'white',
    borderRadius: sizes.borderRadius,
    marginHorizontal: 8,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 28,
    flexDirection: 'row',
  },

  containerBottom: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
});
