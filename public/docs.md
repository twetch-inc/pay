## Twetch Pay

Twetch pay is a simple way to accept payments on your website from a number of wallet providers and payment methods.

Currently supported wallets are Money Button, RelayX and Maxthon VBox.

The simplest Twetch Pay usage looks like this:
```
// in HTML
<script src="https://pay.twetch.com/pay.js"></script>

// in javascript
twetchPay.pay({ outputs: [{
    to: '1harrywon46Aq2b2TK29wKviKUiDzc9EQ',
    amount: 0.0002
  }]
});
```

## The twetchPay object

Including the TwetchPay embed on your makes `twetchPay` available on the browser's `window` object. It has one asynchronous method, `pay` that resolves with
a payment object upon a successful payment and throws if there was an error. `pay` returns `undefined` if the payment was canceled.

## Available options:

### outputs

An array containing a list of output ojects. Each output object may have the following properties:

- `to`: (string) - bitcoin address
- `amount`: (number) - amount of bitcoin (BSV)
- `script`: (string) - valid bitcoin script using ASM format

### wallets

A string array of available wallets for use in the widget. Options are: `moneybutton`, `relayx` and `vbox`.

### onPayment

A function that is called after a successful payment

### onError

A function that is called when an error occurs during the payment

### moneybuttonProps

Additional properties passed into moneybutton.

### relayxProps

Additional propeties passed into relayx

### debug

Whether to enable debugging logging

### appName

Optional. Set application name for some wallets (such as VBox) that need it.
Default: 'Twetch Pay'

### appLogo

Optional. Set application logo for some wallets (such as VBox) that need it.
Default: 'https://twetch-app.now.sh/static/favi.png'

### productName

Optional. Set prodeuct name for some wallets (such as VBox) that need it.
Default: 'Purchase'
