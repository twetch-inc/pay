import Script from 'react-load-script';

const RelayX = props => {
	const handleLoad = () => {
		const div = document.getElementById('relayx-button');

		if (!props.outputs || !props.outputs.length) {
			return;
		}

		const outputs = props.outputs.map(each => ({
			...each,
			currency: 'BSV'
		}));

		window.relayone.render(div, {
			...props,
			...props.relayxProps,
			outputs,
			onPayment: payment => {
				return props.onPayment({ txid: payment.txid });
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
