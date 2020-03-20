import ReactMoneyButton from '@moneybutton/react-money-button';

const MoneyButton = props => {
	const outputs = props.outputs.map(each => ({
		currency: 'BSV',
		...each
	}));

	return (
		<ReactMoneyButton
			{...props}
			{...props.moneybuttonProps}
			outputs={outputs}
			onPayment={payment => {
				if (payment.cryptoOperations) {
					props.moneybuttonProps.onCryptoOperations(payment.cryptoOperations);
				}

				return props.onPayment({ txid: payment.txid, rawtx: payment.rawtx });
			}}
		/>
	);
};

export default MoneyButton;
