const twetchPay = require('./twetch-pay');
window.addEventListener('load', function() {
	twetchPay.init();
});
window.twetchPay = twetchPay;
