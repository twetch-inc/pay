import ReactMoneyButton from '@moneybutton/react-money-button';

const MoneyButton = props => {
	return (
		<ReactMoneyButton
			{...props}
			onPayment={payment => {
				return props.onPayment({ txid: payment.txid });
			}}
		/>
	);
};

export default MoneyButton;
