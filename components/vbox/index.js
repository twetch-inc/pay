import Styles from './styles';
/**
 * Launches VBox when running Maxthon6.
 *
 * @see http://mxdoc.glitch.me/#/payment?id=specifications
 *
 * @param {*} props
 */
const VBoxView = props => {
	const outputs = props.outputs.map(each => ({
		currency: 'BSV',
		...each
	}));
	const appName = props.appName ? props.appName : 'Twetch Pay';
	const appLogo = props.appLogo ? props.appLogo : 'https://twetch-app.now.sh/static/favi.png';
	const productName = props.productName ? props.productName : 'Purchase';
	let adaptedOutputs = [];
	const MAX_SECONDS_EXPIRY = 120;
	for (const output of outputs) {
		adaptedOutputs.push({
			address: output.to,
			value: output.amount * 100000000, // Convert to satoshis
		})
	}
	const launchWallet = async  () =>  {
		if (window && !(window['VBox'])) {
			throw new Error('VBox not found');
		}
		// Construct Request Data
		const expireTime = (new Date()).getTime() + (MAX_SECONDS_EXPIRY * 1000);
		const data = {
			v: 1,
			app: {
				name: appName,
				logo: appLogo,
			},
			id: (Math.floor(Math.random() * 9007199254740990) + 1) + '', // Random ID
			product: productName,
			to: adaptedOutputs,
			broadcast: true,
			ttl: expireTime,
			expire: expireTime
		};
		if (props.debug) {
			console.log('VBox Data', data);
		}
		// Construct Request with base64 encoded Data
		let requestEnvelope = {
			pay_request: {
				data: Buffer.from(JSON.stringify(data)).toString("base64")
			}
		};
		if (props.debug) {
			console.log('VBox Request', requestEnvelope);
		}
		window['VBox'].Request(requestEnvelope, function(result) {
			try {
				if (props.debug) {
					console.log('VBox Data', data);
				}
				let response = Buffer.from(result, 'base64').toString("utf8");
				response = JSON.parse(response);
				// If there was an error (non-zero)
				if (response.code !== 0) {
					console.log('error', response);
					return;
				}
				if (props.debug) {
					console.log('VBox Data', data);
					console.log('VBox Response', response);
				}
				props.onPayment({
					txid: response.txhash,
					rawtx: null,
				});
			} catch (ex) {
				console.log(ex);
			}
		});
	}
	return (
		<div>
			<button className="vbox-btn" onClick={launchWallet}>Launch Wallet</button>
			<Styles />
		</div>
	);
};

export default VBoxView;
