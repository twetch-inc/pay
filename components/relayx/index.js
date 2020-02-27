import Script from 'react-load-script';

const RelayX = props => {
	const handleLoad = () => {
		const div = document.getElementById('relayx-button');
		const { outputs, onPayment, onError } = props;

		if (!outputs || !outputs.length) {
			return;
		}

		window.relayone.render(div, {
			...props
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
