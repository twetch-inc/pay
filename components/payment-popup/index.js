import { useState } from 'react';
import Styles from './styles';

import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import MoneyButton from '../moneybutton';
import RelayX from '../relayx';
import ProxyPay from '../proxypay';

const wallets = {
	moneybutton: {
		name: 'Money Button',
		Element: MoneyButton
	},
	relayx: {
		name: 'RelayX',
		Element: RelayX
	},
	proxypay: {
		name: 'Scan QR',
		Element: ProxyPay
	}
};

const outputs = [
	{
		to: '1harrywon46Aq2b2TK29wKviKUiDzc9EQ',
		amount: 0.0002,
		currency: 'BSV'
	}
];

const PaymentPopup = props => {
	const [wallet, setWallet] = useState('proxypay');
	const [paid, setPaid] = useState(false);

	const handleChange = (evt, value) => {
		setPaid(false);
		setWallet(evt.target.value);
	};
	const Wallet = wallets[wallet].Element;
	const renderWallet = each => (
		<MenuItem value={each} key={each}>
			{wallets[each].name}
		</MenuItem>
	);

	const walletProps = {
		outputs,
		onError: () => {},
		onPayment: () => {
			setPaid(true);
		}
	};

	return (
		<div className="twetch-pay-container">
			<div className="twetch-pay-grow" />
			<div className="twetch-pay-wrapper">
				<div className="twetch-pay-grow" />
				<div className="twetch-pay">
					<div className="twetch-pay-header">
						<img src="/logo.svg" />
						<div className="twetch-pay-grow" />
						<p className="twetch-pay-close">Close</p>
					</div>
					<div className="twetch-pay-body">
						<FormControl variant="outlined" margin="dense">
							<Select value={wallet} onChange={handleChange}>
								{Object.keys(wallets).map(e => renderWallet(e))}
							</Select>
						</FormControl>
					</div>
					<div className="twetch-pay-body">
						{!paid && <Wallet {...walletProps} />}
						{paid && (
							<div>
								<img
									style={{ margin: '0 auto', display: 'block', height: '150px', width: '150px' }}
									src="/checkmark.svg"
								/>
								<div style={{ textAlign: 'center', marginTop: '24px' }}>Payment Success</div>
							</div>
						)}
					</div>
					<div className="twetch-pay-bumper" />
				</div>
				<div className="twetch-pay-grow" />
			</div>
			<Styles />
		</div>
	);
};

export default PaymentPopup;
