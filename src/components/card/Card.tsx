import { View, StyleSheet } from 'react-native';

import CardFront from './CardFront';
import CardBack from './CardBack';
import { useEffect } from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface CardProps {
  inFocus?: string;
  cardName?: string;
  cvvText?: string;
  cardNumbers?: Array<string>;
  backgroundImageIndex?: string;
}

export default function Card({
  inFocus = '',
  cardName = '',
  cvvText = '',
  cardNumbers = [],
  backgroundImageIndex = '21',
}: CardProps) {
  const rotate = useSharedValue(0);

  const nrOfExtraFlips = 0;

  useEffect(() => {
    const showCardBack = inFocus === 'cvv';
    rotate.value = showCardBack ? 1 : 0;
  }, [inFocus, rotate]);

  const frontAnimatedStyles = useAnimatedStyle(() => {
    const rotateValue = interpolate(
      rotate.value,
      [0, 1],
      [0, 180 + 180 * nrOfExtraFlips]
    );
    return {
      transform: [
        {
          rotateY: withTiming(`${rotateValue}deg`, { duration: 1000 }),
        },
      ],
    };
  });
  const backAnimatedStyles = useAnimatedStyle(() => {
    const rotateValue = interpolate(
      rotate.value,
      [0, 1],
      [180, 360 + 180 * nrOfExtraFlips]
    );
    return {
      transform: [
        {
          rotateY: withTiming(`${rotateValue}deg`, { duration: 1000 }),
        },
      ],
    };
  });

  return (
    <View style={styles.cardContainer}>
      <Animated.View style={[styles.card, frontAnimatedStyles]}>
        <CardFront
          inFocus={inFocus}
          cardName={cardName}
          cardNumbers={cardNumbers}
          backgroundImageIndex={backgroundImageIndex}
        />
      </Animated.View>
      <Animated.View style={[styles.card, backAnimatedStyles]}>
        <CardBack
          cvvText={cvvText}
          card4FirstNumbers={cardNumbers[0]}
          backgroundImageIndex={backgroundImageIndex}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    // Android
    elevation: 1,

    // IOS
    zIndex: 1,

    transform: [{ translateY: 80 }],
    height: 200,
    width: 300,
    position: 'relative',
  },

  card: {
    overflow: 'hidden',
    position: 'absolute',
    backfaceVisibility: 'hidden',
    width: '100%',
    height: '100%',
    borderRadius: 14,

    // phone
    elevation: 20,
    // web
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 30,
  },
});
