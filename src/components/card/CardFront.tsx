import { View, Image, Text, StyleSheet, ImageBackground } from 'react-native';
import Animated, {
  RotateInDownRight,
  RotateOutDownRight,
  FadeInUp,
  FadeOutDown,
} from 'react-native-reanimated';

import { colors, sizes } from '../../styles/theme';
import useImageWidth from '../../hooks/useImageWidth';
import { getCardType, getLogo } from '../../util/cardLogoUtils';
import { getBackgroundImage } from '../../util/backgroundImageUtils';
import { useExpiration } from '../ExpirationContext';
import CardLogo from './CardLogo';

interface CardFrontProps {
  inFocus?: string;
  cardName?: string;
  cardNumbers?: Array<string>;
  backgroundImageIndex?: string;
}

function CardFront({
  inFocus = '',
  cardName = '',
  cardNumbers = [],
  backgroundImageIndex = '21',
}: CardFrontProps) {
  const chipURL = require('../../assets/images/chip.png');

  const logoHeight = 40;
  const cardType = getCardType(cardNumbers[0]);
  const logoSource = getLogo(cardType);
  const logoWidth = useImageWidth(logoSource, logoHeight);
  const backgroundImage = getBackgroundImage(backgroundImageIndex);
  const { month, year } = useExpiration();

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const writeNumbers = (cardNumbers: string[]) => {
    return (
      <View
        style={[
          styles.cardNumberContainer,
          inFocus === 'cardNumber' && styles.isInFocus,
        ]}
      >
        {cardNumbers.map((chunk, index) => {
          const characters = chunk.split(''); // Split each chunk into characters
          return (
            <View
              key={index}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              {characters.map((number, charIndex) => (
                <Animated.Text
                  key={charIndex + '-' + number}
                  style={styles.cardNumberText}
                  entering={FadeInUp}
                  exiting={FadeOutDown}
                >
                  {number}
                </Animated.Text>
              ))}
            </View>
          );
        })}
      </View>
    );
  };

  const writeName = (_name: string) => {
    const characters = _name.split('');
    return characters.map((char, charIndex) => (
      <Animated.View
        key={charIndex + '-' + char}
        entering={RotateInDownRight}
        exiting={RotateOutDownRight}
      >
        <Text style={styles.textChar}>{char}</Text>
      </Animated.View>
    ));
  };

  const writeDate = (_month: string, _year: string) => {
    return (
      <View style={styles.MMYYRow}>
        <Animated.Text
          style={styles.textChar}
          key={_month}
          entering={FadeInUp}
          exiting={FadeOutDown}
        >
          {_month}
        </Animated.Text>
        <Text style={styles.textChar}>/</Text>
        <Animated.Text
          style={styles.textChar}
          key={_year}
          entering={FadeInUp}
          exiting={FadeOutDown}
        >
          {_year}
        </Animated.Text>
      </View>
    );
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.card}>
      <View style={styles.contentContainer}>
        <View style={styles.containerTop}>
          <Image source={chipURL} style={styles.chip} />
          <CardLogo
            cardType={cardType}
            logoSource={logoSource}
            logoHeight={logoHeight}
            logoWidth={logoWidth}
          />
        </View>
        <View style={styles.containerCenter}>{writeNumbers(cardNumbers)}</View>
        <View style={styles.containerBottom}>
          <View
            style={[
              styles.cardHolder,
              inFocus === 'cardHolder' && styles.isInFocus,
            ]}
          >
            <Text style={styles.textHeader}>Card Holder</Text>
            <View style={styles.cardTextContainer}>{writeName(cardName)}</View>
          </View>
          <View
            style={[
              styles.expiration,
              inFocus === 'expires' && styles.isInFocus,
            ]}
          >
            <Text style={styles.textHeader}>Expires</Text>
            <Text style={styles.cardTextContainer}>
              {' '}
              {writeDate(month, year.substring(2))}
            </Text>
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
    padding: 16,
  },

  card: {
    flex: 1,
  },
  containerTop: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },

  chip: {
    height: 40,
    width: 50,
  },

  containerCenter: {
    flex: 1,
    justifyContent: 'center',
  },

  cardNumberContainer: {
    alignSelf: 'flex-start',
    padding: 8,
    gap: 24,
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: sizes.borderWidth,
    borderRadius: sizes.borderRadius,
    borderColor: 'transparent', //colors.cardFocus,
    width: 240,
    height: 40,
  },

  cardTextContainer: {
    overflow: 'hidden',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },

  textChar: {
    fontSize: 14,
    color: colors.cardText,
    textShadowColor: colors.textShadowColor,
    textShadowRadius: sizes.textShadowRadius,
  },

  cardNumberText: {
    fontSize: 16,
    color: colors.cardText,
    textShadowColor: colors.textShadowColor,
    textShadowRadius: sizes.textShadowRadius,
  },

  textHeader: {
    fontSize: 12,
    color: colors.cardHeader,
  },

  containerBottom: {
    flex: 1,
    flexDirection: 'row',
    gap: 22,
  },

  cardHolder: {
    flex: 2.8,
    justifyContent: 'flex-end',
    padding: 8,
    borderWidth: sizes.borderWidth,
    borderRadius: sizes.borderRadius,
    borderColor: 'transparent', //colors.cardFocus,
  },

  expiration: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 8,
    borderWidth: sizes.borderWidth,
    borderRadius: sizes.borderRadius,
    borderColor: 'transparent', //colors.cardFocus,
  },

  MMYYRow: {
    flexDirection: 'row',
  },

  isInFocus: {
    borderColor: colors.cardFocus,
  },
});

export default CardFront;
