import proxypay from 'proxypay';
import bitcoin from 'bsv';
import QRCode from 'qrcode.react';

// resolve paymails
// exchange-rate

const ProxyPay = props => {
	const outputs = props.outputs.map(each => ({
		...each,
		satoshis: each.amount * 100000000
	}));
	const key = bitcoin.PrivateKey.fromRandom().toString();
	const proxypayProps = { ...props, outputs, key };

	const payment = proxypay({ ...proxypayProps });

	return (
		<div>
			<div style={{ display: 'flex' }}>
				<div style={{ flexGrow: '1' }} />
				<QRCode size={150} value={payment.bip21URI} />
				<div style={{ flexGrow: '1' }} />
			</div>
			<p style={{ textAlign: 'center' }}>
				Please send {payment.requiredSatoshis} satoshis to
				<br />
				{payment.address}
			</p>
		</div>
	);
};

export default ProxyPay;
