import { useState, useEffect } from 'react';
import { Image, Platform, type ImageSourcePropType } from 'react-native';

/**
 * This hook calculates the width of an image based on a
 * preferred image height while maintaining the image's aspect ratio.
 *
 * @param {Object} image - Image is retrived with: require("./path/to/img").
 * @param {number} preferredImageHeight - The desired height of the image.
 *
 * @returns {number} - The calculated width of the image, with correct aspect ratio.
 * **/
const useImageWidth = (
  image: ImageSourcePropType,
  preferredImageHeight: number
): number => {
  const [imageWidth, setImageWidth] = useState<number>(0);

  useEffect(() => {
    if (Platform.OS === 'web') {
      return;
      // Image.getSize(image.uri, (width, height) => {
      //   const aspectRatio = width / height;
      //   setImageWidth(preferredImageHeight * aspectRatio);
      // });
    } else {
      const { width, height } = Image.resolveAssetSource(image);
      const aspectRatio = width / height;
      setImageWidth(preferredImageHeight * aspectRatio);
    }
  }, [image, preferredImageHeight]);

  return imageWidth;
};

export default useImageWidth;
