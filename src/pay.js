class TwetchPay {
	init() {
		this.origin = 'https://twetch-pay.now.sh';
		//this.origin = 'http://localhost:4000';
		this.iframe = document.createElement('iframe');
		this.iframe.style.border = 'none';
		this.iframe.style.overflow = 'hidden';
		this.iframe.style.width = '0px';
		this.iframe.style.height = '0px';
		this.iframe.style.position = 'fixed';
		this.iframe.style.top = 0;
		this.iframe.style.left = 0;
		this.iframe.setAttribute('src', this.origin);
		document.body.appendChild(this.iframe);
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

		if (!this.iframe.contentWindow) {
			return;
		}

		this.iframe.contentWindow.postMessage({ from: 'twetch-pay', props }, this.origin);
		this.displayIframe();
		const self = this;

		return new Promise((resolve, reject) => {
			window.addEventListener('message', function respond(event) {
				window.removeEventListener('message', respond);
				const data = event.data;

				if (data && typeof data === 'object' && data.action) {
					const action = {
						closeTwetchPay: () => {
							self.hideIframe();
							return resolve();
						},
						paymentTwetchPay: () => {
							self.hideIframe();
							onPayment && onPayment(data.payment);
							return resolve(data.payment);
						},
						errorTwetchPay: () => {
							self.hideIframe();
							onError && onError(data.error);
							return reject(data.error);
						},
						cryptoOperationsTwetchPay: () => {
							self.hideIframe();
							return onCryptoOperations && onCryptoOperations(data.cryptoOperations);
						}
					}[data.action];

					action && action();
				}
			});
		});
	}
}

const twetchPay = new TwetchPay();

window.addEventListener('load', function() {
	twetchPay.init();
});

window.twetchPay = twetchPay;
