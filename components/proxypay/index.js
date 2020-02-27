import { useState } from 'react';
import proxypay from 'proxypay';
import bitcoin from 'bsv';
import QRCode from 'qrcode.react';
import copy from 'copy-to-clipboard';
import Snackbar from '@material-ui/core/Snackbar';

const key = bitcoin.PrivateKey.fromRandom().toString();

const ProxyPay = props => {
	const [snackbarOpen, setSnackbar] = useState(false);
	const outputs = props.outputs.map(each => ({
		...each,
		satoshis: each.amount * 100000000
	}));

	let payment;
	const proxypayProps = {
		...props,
		outputs,
		onError: async error => {
			console.log('sweep');
			await payment.sweep('1harrywon46Aq2b2TK29wKviKUiDzc9EQ');
			return props.onError({ error });
		},
		onPayment: payment => {
			return props.onPayment({ txid: payment.txid });
		},
		key
	};

	payment = proxypay({ ...proxypayProps });

	const handleCopy = evt => {
		evt.preventDefault();
		evt.stopPropagation();

		copy(payment.address, { message: 'copy to clipboard' });
		setSnackbar(true);
	};

	const handleCloseSnackbar = () => {
		setSnackbar(false);
	};

	return (
		<div>
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				open={snackbarOpen}
				autoHideDuration={1000}
				onClose={handleCloseSnackbar}
				message={<span id="message-id">Copied to Clipboard</span>}
			/>
			<div style={{ display: 'flex' }}>
				<div style={{ flexGrow: '1' }} />
				<div
					style={{
						margin: '0 auto 16px auto',
						padding: '7px 18px',
						background: 'rgba(0, 0, 0, 0.05)',
						borderRadius: '100px'
					}}
				>
					<p
						style={{
							fontSize: '14px',
							lineHeight: '18px',
							color: '#828282',
							margin: '0'
						}}
					>
						Amount to Send:
						<span style={{ color: '#085AF6', marginLeft: '8px' }}>
							{payment.requiredSatoshis / 100000000} BSV
						</span>
					</p>
				</div>
				<div style={{ flexGrow: '1' }} />
			</div>
			<div style={{ display: 'flex' }}>
				<div style={{ flexGrow: '1' }} />
				<QRCode size={150} value={payment.bip21URI} />
				<div style={{ flexGrow: '1' }} />
			</div>
			<div />
			<div style={{ display: 'flex' }}>
				<div style={{ flexGrow: '1' }} />
				<div
					style={{
						display: 'flex',
						padding: '12px 24px 12px 14px',
						border: '1px solid #DEDEDE',
						borderRadius: '100px',
						marginTop: '16px',
						cursor: 'pointer',
						maxWidth: '100%'
					}}
					onClick={handleCopy}
				>
					<p
						style={{
							fontSize: '12px',
							lineHeight: '16px',
							color: '#828282',
							margin: '0',
							marginRight: '18px',
							whiteSpace: 'nowrap',
							textOverflow: 'ellipsis',
							overflow: 'hidden'
						}}
					>
						{payment.address}
					</p>
					<img src="/copy.svg" style={{ display: 'inline-block', height: '16px', width: '16px' }} />
				</div>
				<div style={{ flexGrow: '1' }} />
			</div>
		</div>
	);
};

export default ProxyPay;
