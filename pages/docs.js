import ReactMarkdown from 'react-markdown';

const content = `
## Twetch Pay

Twetch pay is a simple way to accept payments on your website from a number of wallet providers and payment methods.

Currently supported wallets are Money Button and RelayX.

The simplest Twetch Pay usage looks like this:
\`\`\`
// in HTML
<script src="https://pay.twetch.com/pay.js"></script>

// in javascript
twetchPay.pay({
  outputs: [{
    to: '1harrywon46Aq2b2TK29wKviKUiDzc9EQ',
    amount: 0.0002
  }]
});
\`\`\`

## The twetchPay object

Including the TwetchPay embed on your makes \`twetchPay\` available on the browser's \`window\` object. It has one asynchronous method, \`pay\` that resolves with 
a payment object upon a successful payment and throws if there was an error. \`pay\` returns \`undefined\` if the payment was canceled.

## Available options:

### outputs

An array containing a list of output ojects. Each output object may have the following properties:

- \`to\`: (string) - bitcoin address
- \`amount\`: (number) - amount of bitcoin (BSV)
- \`script\`: (string) - valid bitcoin script using ASM format

### onPayment

A function that is called after a successful payment

### onError

A function that is called when an error occurs during the payment

### moneybuttonProps

Additional properties passed into moneybutton.

### relayxProps

Additional propeties passed into relayx
`;

const Docs = () => {
	return (
		<div style={{ width: '100vw' }}>
			<div style={{ maxWidth: '100%', margin: '0 auto', width: '600px' }}>
				<ReactMarkdown source={content} />
			</div>
			<style jsx global>{`
				html,
				body {
					min-height: 100%;
					padding: 0;
					margin: 0;
					font-family: proxima-nova, Helvetica;
				}

				code {
					background: #dedede;
					line-height: 18px;
					padding: 0 4px;
					border-radius: 6px;
				}

				pre {
					border-radius: 6px;
					background: #dedede;
					padding: 12px;
				}

				* {
					box-sizing: border-box;
				}
			`}</style>
		</div>
	);
};

export default Docs;
