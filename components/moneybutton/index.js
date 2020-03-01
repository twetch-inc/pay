import ReactMoneyButton from '@moneybutton/react-money-button';

const MoneyButton = props => {
	const outputs = props.outputs.map(each => ({
		...each,
		currency: 'BSV'
	}));

	return (
		<ReactMoneyButton
			{...props}
			{...props.moneybuttonProps}
			outputs={outputs}
			onPayment={payment => {
				return props.onPayment({ txid: payment.txid, rawtx: payment.rawtx });
			}}
		/>
	);
};

export default MoneyButton;
