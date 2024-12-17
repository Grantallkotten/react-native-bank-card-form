# react-native-credit-card-form

A React Native UI component designed to handle credit card input values. It includes multiple callback functions to manage changes within the component.

## Installation

```sh
npm install react-native-credit-card-form
```

## Usage

```ts
import CreditCardForm from 'react-native-credit-card-form';

export default function App() {

  const handleCVVChange = (value: string) => {
    console.log('Current CVV: ' + value);
  };

  const handleCardNameChange = (value: string) => {
    console.log('Card Name: ' + value);
  };

  const handleCardNumberChange = (value: string) => {
    console.log('Card Number: ' + value);
  };

  const handleExpirationMonthChange = (value: string) => {
    console.log('Expiration Month: ' + value);
  };

  const handleExpirationYearChange = (value: string) => {
    console.log('Expiration Year: ' + value);
  };

  return (
    <CreditCardForm
      onCVVChange={handleCVVChange}
      onCardNameChange={handleCardNameChange}
      onCardNumberChange={handleCardNumberChange}
      onExpirationMonthChange={handleExpirationMonthChange}
      onExpirationYearChange={handleExpirationYearChange}
    />
  );
}
```

## Props

| Prop Name                 | Type                           | Description                                           | Required |
| ------------------------- | ------------------------------ | ----------------------------------------------------- | -------- |
| `onCardNumberChange`      | `(cardNumber: string) => void` | Callback triggered when the card number changes.      | No       |
| `onCardNameChange`        | `(cardName: string) => void`   | Callback triggered when the cardholder name changes.  | No       |
| `onCVVChange`             | `(cvv: string) => void`        | Callback triggered when the CVV changes.              | No       |
| `onExpirationMonthChange` | `(month: string) => void`      | Callback triggered when the expiration month changes. | No       |
| `onExpirationYearChange`  | `(year: string) => void`       | Callback triggered when the expiration year changes.  | No       |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
