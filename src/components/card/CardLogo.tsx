import React from 'react';
import type { ImageSourcePropType } from 'react-native';
import Animated, { FlipInEasyX, FlipOutEasyX } from 'react-native-reanimated';

interface CardLogoProps {
  cardType: string;
  logoSource: ImageSourcePropType;
  logoHeight: number;
  logoWidth: number;
}

const CardLogo: React.FC<CardLogoProps> = ({
  cardType,
  logoSource,
  logoHeight,
  logoWidth,
}) => {
  return (
    <Animated.Image
      source={logoSource}
      style={{
        height: logoHeight,
        width: logoWidth,
        maxWidth: 80,
      }}
      resizeMode="contain"
      entering={FlipInEasyX}
      exiting={FlipOutEasyX}
      key={cardType}
    />
  );
};

export default CardLogo;
