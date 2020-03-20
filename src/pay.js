const Postmate = require('postmate');

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

class TwetchPay {
	async init() {
		var style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = `.twetchPayFrame {
			border: none;
			overflow: hidden;
			width: 0px;
			height: 0px;
			position: fixed;
			bottom: 0;
			left: 0;
		}`;
		document.getElementsByTagName('head')[0].appendChild(style);
		this.child = await new Postmate({
			container: document.body,
			url: 'https://twetch-pay.now.sh',
			classListArray: ['twetchPayFrame']
		});
		this.iframe = this.child.frame;
		this.child.on('init', init => {
			this.didInit = true;
		});
	}

	displayIframe() {
		this.iframe.style.height = '100%';
		this.iframe.style.width = '100vw';
	}

	hideIframe() {
		this.iframe.style.width = '0px';
		this.iframe.style.height = '0px';
	}

	async pay(props) {
		if (!this.didInit) {
			await sleep(200);
			this.pay(props);
			return;
		}

		let onCryptoOperations;
		let onError;
		let onPayment;

		if (props.moneybuttonProps && props.moneybuttonProps.onCryptoOperations) {
			onCryptoOperations = props.moneybuttonProps.onCryptoOperations;
			delete props.moneybuttonProps.onCryptoOperations;
		}

		if (props.onPayment) {
			onPayment = props.onPayment;
			delete props.onPayment;
		}

		if (props.onError) {
			onError = props.onError;
			delete props.onError;
		}

		this.child.call('pay', { props });
		this.displayIframe();
		const self = this;

		return new Promise((resolve, reject) => {
			self.child.on('close', () => {
				self.hideIframe();
				return resolve();
			});
			self.child.on('payment', ({ payment }) => {
				self.hideIframe();
				onPayment && onPayment(payment);
				return resolve(payment);
			});
			self.child.on('error', ({ error }) => {
				self.hideIframe();
				onError && onError(error);
				return reject(error);
			});
			self.child.on('cryptoOperations', ({ cryptoOperations }) => {
				self.hideIframe();
				return onCryptoOperations && onCryptoOperations(cryptoOperations);
			});
		});
	}
}

const twetchPay = new TwetchPay();

window.addEventListener('load', function() {
	twetchPay.init();
});

window.twetchPay = twetchPay;
