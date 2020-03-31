import Script from 'react-load-script';

const RelayX = props => {
	const handleLoad = () => {
		const div = document.getElementById('relayx-button');

		if (!props.outputs || !props.outputs.length) {
			return;
		}

		const outputs = props.outputs.map(each => ({
			currency: 'BSV',
			...each
		}));

		const walletProps = {
			...props,
			...props.relayxProps,
			outputs
		};

		delete walletProps.moneybuttonProps;
		delete walletProps.parent;

		window.relayone.render(div, {
			...walletProps,
			onPayment: payment => {
				return props.onPayment({ txid: payment.txid, rawtx: payment.rawTx });
			}
		});
	};

	return (
		<>
			<Script url="https://one.relayx.io/relayone.js" onLoad={handleLoad} />
			<div id="relayx-button" style={{ height: '43px' }} />
		</>
	);
};

export default RelayX;
