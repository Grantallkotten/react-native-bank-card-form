import type { ImageSourcePropType } from 'react-native';

let lastValidCardType = 'Unknown';

/**
 * Algorithm found at: https://www.regular-expressions.info/bankcard.html
 * Find all cards at wiki: https://en.wikipedia.org/wiki/Payment_card_number
 *
 * This function detect bank card type based on the first four digits of a card.
 * Note: Cards get updated all the time, so some algorithms may be outdated.
 *
 * @param {string} firstFourDigits - The first four digits of the card.
 *
 * @returns {sting} - The detected card type.
 * **/
export function getCardType(firstFourDigits: string | undefined): string {
  const cardPatterns = [
    {
      type: 'Unknown',
      regex: /^[^0-9]*$/,
    },
    {
      type: 'Visa',
      regex: /^4[0-9]{3}$/,
    },
    {
      type: 'MasterCard',
      regex: /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|2720)$/,
    },

    {
      type: 'American_Express',
      regex: /^(?:34[0-9]{2}|37[0-9]{2})$/,
    },
    {
      type: 'Diners_Club',
      regex: /^(?:300[0-9]|36[0-9]{2}|38[0-9]{2})$/,
    },
    {
      type: 'Discover',
      regex: /^6(?:011|5[0-9]{2})$/,
    },
    {
      type: 'JCB',
      regex: /^(?:2131|1800)$/,
    },
    {
      type: 'Troy',
      regex: /^9792$/,
    },
    {
      type: 'UnionPay',
      regex: /^62[0-9]{2}$/,
    },
  ];

  // Loop though all cardPatters and see if we have a match
  for (const card of cardPatterns) {
    if (!firstFourDigits) continue;

    if (card.regex.test(firstFourDigits)) {
      lastValidCardType = card.type;
      return card.type;
    }
  }

  // No match, keep the last valid card to be able to fade out card
  return lastValidCardType;
}

export function getLogo(name: string): ImageSourcePropType {
  return logoMapping[name] || logoMapping;
}

const logoMapping: { [key: string]: ImageSourcePropType } = {
  Unknown: require('../assets/images/unknown.png'),
  Visa: require('../assets/images/visa.png'),
  MasterCard: require('../assets/images/mastercard.png'),
  American_Express: require('../assets/images/amex.png'),
  Diners_Club: require('../assets/images/dinersclub.png'),
  Discover: require('../assets/images/discover.png'),
  JCB: require('../assets/images/jcb.png'),
  Troy: require('../assets/images/troy.png'),
  UnionPay: require('../assets/images/unionpay.png'),
  default: require('../assets/images/unknown.png'),
};
