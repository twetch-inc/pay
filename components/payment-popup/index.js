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
	}
	//proxypay: {
		//name: 'Scan QR',
		//Element: ProxyPay
	//}
};

const outputs = [
	{
		to: '1harrywon46Aq2b2TK29wKviKUiDzc9EQ',
		amount: 0.0002,
		currency: 'BSV'
	}
];

const PaymentPopup = props => {
	const [wallet, setWallet] = useState('moneybutton');
	const [paid, setPaid] = useState(false);

	const handleChange = (evt, value) => {
		setPaid(false);
		setWallet(evt.target.value);
	};
	const Wallet = wallets[wallet].Element;
	const renderWallet = each => (
		<MenuItem
			classes={{
				root: 'twetch-pay-menu-item',
				selected: 'twetch-pay-menu-item-selected'
			}}
			value={each}
			key={each}
		>
			{wallets[each].name}
		</MenuItem>
	);

	const handleClose = () => {
		window.top.postMessage({ action: 'closeTwetchPay' });
	};

	const walletProps = {
		outputs,
		...props,
		onError: error => {
			window.top.postMessage({ action: 'errorTwetchPay', error });
		},
		onPayment: payment => {
			window.top.postMessage({ action: 'paymentTwetchPay', payment });
			setPaid(true);
			setTimeout(() => {
				setPaid(false);
			}, 1000);
		}
	};

	return (
		<div className="twetch-pay-container" onClick={handleClose}>
			<div className="twetch-pay-grow" />
			<div className="twetch-pay-wrapper">
				<div className="twetch-pay-grow" />
				<div
					className="twetch-pay"
					onClick={evt => {
						evt.preventDefault();
						evt.stopPropagation();
					}}
				>
					<div className="twetch-pay-header">
						<img src="/logo.svg" />
						<div className="twetch-pay-grow" />
						<p className="twetch-pay-close" onClick={handleClose}>
							Close
						</p>
					</div>
					<div className="twetch-pay-body">
						<FormControl variant="outlined" margin="dense" className="twetch-pay-form-control">
							<Select
								value={wallet}
								onChange={handleChange}
								className="twetch-pay-select"
								MenuProps={{
									MenuListProps: {
										classes: {
											root: 'twetch-pay-menu-list'
										}
									},
									anchorOrigin: {
										vertical: 'bottom',
										horizontal: 'left'
									},
									transformOrigin: {
										vertical: 'top',
										horizontal: 'left'
									}
								}}
								classes={{
									outlined: 'twetch-pay-select-outlined'
								}}
							>
								{Object.keys(wallets).map(e => renderWallet(e))}
							</Select>
						</FormControl>
					</div>
					<div className="twetch-pay-body">
						{!paid && <Wallet {...walletProps} />}
						{paid && (
							<div>
								<img
									style={{ margin: '0 auto', display: 'block', height: '70px', width: '70px' }}
									src="/checkmark.svg"
								/>
								<div style={{ textAlign: 'center', marginTop: '16px' }}>Payment Sent</div>
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
