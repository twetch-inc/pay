class TwetchPay {
	init() {
		this.iframe = document.createElement('iframe');
		this.iframe.src = 'https://twetch-pay.now.sh';
		this.iframe.style.border = 'none';
		this.iframe.style.overflow = 'hidden';
		this.iframe.style.width = '0px';
		this.iframe.style.height = '0px';
		this.iframe.style.position = 'fixed';
		this.iframe.style.top = 0;
		this.iframe.style.left = 0;
		this.iframe.setAttribute('src', 'https://twetch-pay.now.sh');
		document.body.appendChild(this.iframe);
	}

	displayIframe() {
		this.iframe.style.height = '100vh';
		this.iframe.style.width = '100vw';
	}

	hideIframe() {
		this.iframe.style.width = '0px';
		this.iframe.style.height = '0px';
	}

	async pay(props) {
		this.iframe.contentWindow.postMessage({ from: 'twetch-pay', props });
		this.displayIframe();

		return new Promise((resolve, reject) => {
			window.addEventListener('message', event => {
				const data = event.data;
				if (data && typeof data === 'object' && data.action) {
					if (data.action === 'closeTwetchPay') {
						this.hideIframe();
						return resolve();
					}

					if (data.action === 'paymentTwetchPay') {
						this.hideIframe();
						return resolve(data.payment);
					}

					if (data.action === 'errorTwetchPay') {
						this.hideIframe();
						return reject(data.error);
					}
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
