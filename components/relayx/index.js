import Script from 'react-load-script';

const RelayX = props => {
	const handleLoad = () => {
		const div = document.getElementById('relayx-button');

		if (!props.outputs || !props.outputs.length) {
			return;
		}

		window.relayone.render(div, {
			...props,
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
