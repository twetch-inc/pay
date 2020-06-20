/**
  postmate - A powerful, simple, promise-based postMessage library
  @version v1.6.0
  @link https://github.com/dollarshaveclub/postmate
  @author Jacob Kelley <jakie8@gmail.com>
  @license MIT
**/

var messageType = 'application/x-postmate-v1+json';
var maxHandshakeRequests = 5;
var _messageId = 0;
var generateNewMessageId = function generateNewMessageId() {
	return ++_messageId;
};
var log = function log() {
	var _console;

	return Postmate.debug ? (_console = console).log.apply(_console, arguments) : null;
}; // eslint-disable-line no-console
var resolveOrigin = function resolveOrigin(url) {
	var a = document.createElement('a');
	a.href = url;
	var protocol = a.protocol.length > 4 ? a.protocol : window.location.protocol;
	var host = a.host.length
		? a.port === '80' || a.port === '443'
			? a.hostname
			: a.host
		: window.location.host;
	return a.origin || protocol + '//' + host;
};
var messageTypes = {
	handshake: 1,
	'handshake-reply': 1,
	call: 1,
	emit: 1,
	reply: 1,
	request: 1
};
var sanitize = function sanitize(message, allowedOrigin) {
	if (typeof allowedOrigin === 'string' && message.origin !== allowedOrigin) return false;
	if (!message.data) return false;
	if (typeof message.data === 'object' && !('postmate' in message.data)) return false;
	if (message.data.type !== messageType) return false;
	if (!messageTypes[message.data.postmate]) return false;
	return true;
};
var resolveValue = function resolveValue(model, property) {
	var unwrappedContext =
		typeof model[property] === 'function' ? model[property]() : model[property];
	return Postmate.Promise.resolve(unwrappedContext);
};
var ParentAPI = (function() {
	function ParentAPI(info) {
		var _this = this;

		this.parent = info.parent;
		this.frame = info.frame;
		this.child = info.child;
		this.childOrigin = info.childOrigin;
		this.events = {};

		if (process.env.NODE_ENV !== 'production') {
			log('Parent: Registering API');
			log('Parent: Awaiting messages...');
		}

		this.listener = function(e) {
			if (!sanitize(e, _this.childOrigin)) return false;

			var _ref = ((e || {}).data || {}).value || {},
				data = _ref.data,
				name = _ref.name;

			if (e.data.postmate === 'emit') {
				if (process.env.NODE_ENV !== 'production') {
					log('Parent: Received event emission: ' + name);
				}

				if (name in _this.events) {
					_this.events[name].forEach(function(callback) {
						callback.call(_this, data);
					});
				}
			}
		};

		this.parent.addEventListener('message', this.listener, false);

		if (process.env.NODE_ENV !== 'production') {
			log('Parent: Awaiting event emissions from Child');
		}
	}

	var _proto = ParentAPI.prototype;

	_proto.get = function get(property) {
		var _this2 = this;

		return new Postmate.Promise(function(resolve) {
			var uid = generateNewMessageId();

			var transact = function transact(e) {
				if (e.data.uid === uid && e.data.postmate === 'reply') {
					_this2.parent.removeEventListener('message', transact, false);

					resolve(e.data.value);
				}
			}; // Prepare for response from Child...

			_this2.parent.addEventListener('message', transact, false); // Then ask child for information

			_this2.child.postMessage(
				{
					postmate: 'request',
					type: messageType,
					property: property,
					uid: uid
				},
				_this2.childOrigin
			);
		});
	};

	_proto.call = function call(property, data) {
		this.child.postMessage(
			{
				postmate: 'call',
				type: messageType,
				property: property,
				data: data
			},
			this.childOrigin
		);
	};

	_proto.on = function on(eventName, callback) {
		if (!this.events[eventName]) {
			this.events[eventName] = [];
		}

		this.events[eventName].push(callback);
	};

	_proto.destroy = function destroy() {
		if (process.env.NODE_ENV !== 'production') {
			log('Parent: Destroying Postmate instance');
		}

		window.removeEventListener('message', this.listener, false);
		this.frame.parentNode.removeChild(this.frame);
	};

	return ParentAPI;
})();

var ChildAPI =
	/*#__PURE__*/
	(function() {
		function ChildAPI(info) {
			var _this3 = this;

			this.model = info.model;
			this.parent = info.parent;
			this.parentOrigin = info.parentOrigin;
			this.child = info.child;

			if (process.env.NODE_ENV !== 'production') {
				log('Child: Registering API');
				log('Child: Awaiting messages...');
			}

			this.child.addEventListener('message', function(e) {
				if (!sanitize(e, _this3.parentOrigin)) return;

				if (process.env.NODE_ENV !== 'production') {
					log('Child: Received request', e.data);
				}

				var _e$data = e.data,
					property = _e$data.property,
					uid = _e$data.uid,
					data = _e$data.data;

				if (e.data.postmate === 'call') {
					if (property in _this3.model && typeof _this3.model[property] === 'function') {
						_this3.model[property](data);
					}

					return;
				} // Reply to Parent

				resolveValue(_this3.model, property).then(function(value) {
					return e.source.postMessage(
						{
							property: property,
							postmate: 'reply',
							type: messageType,
							uid: uid,
							value: value
						},
						e.origin
					);
				});
			});
		}

		var _proto2 = ChildAPI.prototype;

		_proto2.emit = function emit(name, data) {
			if (process.env.NODE_ENV !== 'production') {
				log('Child: Emitting Event "' + name + '"', data);
			}

			this.parent.postMessage(
				{
					postmate: 'emit',
					type: messageType,
					value: {
						name: name,
						data: data
					}
				},
				this.parentOrigin
			);
		};

		return ChildAPI;
	})();

var Postmate = (function() {
	function Postmate(_ref2) {
		var _ref2$container = _ref2.container,
			container =
				_ref2$container === void 0
					? typeof container !== 'undefined'
						? container
						: document.body
					: _ref2$container,
			model = _ref2.model,
			url = _ref2.url,
			name = _ref2.name,
			_ref2$classListArray = _ref2.classListArray,
			classListArray = _ref2$classListArray === void 0 ? [] : _ref2$classListArray;
		this.parent = window;
		this.frame = document.createElement('iframe');
		this.frame.name = name || '';
		this.frame.classList.add.apply(this.frame.classList, classListArray);
		container.appendChild(this.frame);
		this.child = this.frame.contentWindow || this.frame.contentDocument.parentWindow;
		this.model = model || {};
		return this.sendHandshake(url);
	}

	var _proto3 = Postmate.prototype;

	_proto3.sendHandshake = function sendHandshake(url) {
		var _this4 = this;

		var childOrigin = resolveOrigin(url);
		var attempt = 0;
		var responseInterval;
		return new Postmate.Promise(function(resolve, reject) {
			var reply = function reply(e) {
				if (!sanitize(e, childOrigin)) return false;

				if (e.data.postmate === 'handshake-reply') {
					clearInterval(responseInterval);

					if (process.env.NODE_ENV !== 'production') {
						log('Parent: Received handshake reply from Child');
					}

					_this4.parent.removeEventListener('message', reply, false);

					_this4.childOrigin = e.origin;

					if (process.env.NODE_ENV !== 'production') {
						log('Parent: Saving Child origin', _this4.childOrigin);
					}

					return resolve(new ParentAPI(_this4));
				}

				if (process.env.NODE_ENV !== 'production') {
					log('Parent: Invalid handshake reply');
				}

				return reject('Failed handshake');
			};

			_this4.parent.addEventListener('message', reply, false);

			var doSend = function doSend() {
				attempt++;

				if (process.env.NODE_ENV !== 'production') {
					log('Parent: Sending handshake attempt ' + attempt, {
						childOrigin: childOrigin
					});
				}

				_this4.child.postMessage(
					{
						postmate: 'handshake',
						type: messageType,
						model: _this4.model
					},
					childOrigin
				);

				if (attempt === maxHandshakeRequests) {
					clearInterval(responseInterval);
				}
			};

			var loaded = function loaded() {
				doSend();
				responseInterval = setInterval(doSend, 500);
			};

			if (_this4.frame.attachEvent) {
				_this4.frame.attachEvent('onload', loaded);
			} else {
				_this4.frame.addEventListener('load', loaded);
			}

			if (process.env.NODE_ENV !== 'production') {
				log('Parent: Loading frame', {
					url: url
				});
			}

			_this4.frame.src = url;
		});
	};

	return Postmate;
})();

Postmate.debug = false;

Postmate.Promise = (function() {
	try {
		return window ? window.Promise : Promise;
	} catch (e) {
		return null;
	}
})();

Postmate.Model = (function() {
	function Model(model) {
		this.child = window;
		this.model = model;
		this.parent = this.child.parent;
		return this.sendHandshakeReply();
	}

	var _proto4 = Model.prototype;

	_proto4.sendHandshakeReply = function sendHandshakeReply() {
		var _this5 = this;

		return new Postmate.Promise(function(resolve, reject) {
			var shake = function shake(e) {
				if (!e.data.postmate) {
					return;
				}

				if (e.data.postmate === 'handshake') {
					if (process.env.NODE_ENV !== 'production') {
						log('Child: Received handshake from Parent');
					}

					_this5.child.removeEventListener('message', shake, false);

					if (process.env.NODE_ENV !== 'production') {
						log('Child: Sending handshake reply to Parent');
					}

					e.source.postMessage(
						{
							postmate: 'handshake-reply',
							type: messageType
						},
						e.origin
					);
					_this5.parentOrigin = e.origin; // Extend model with the one provided by the parent

					var defaults = e.data.model;

					if (defaults) {
						Object.keys(defaults).forEach(function(key) {
							_this5.model[key] = defaults[key];
						});

						if (process.env.NODE_ENV !== 'production') {
							log('Child: Inherited and extended model from Parent');
						}
					}

					if (process.env.NODE_ENV !== 'production') {
						log('Child: Saving Parent origin', _this5.parentOrigin);
					}

					return resolve(new ChildAPI(_this5));
				}

				return reject('Handshake Reply Failed');
			};

			_this5.child.addEventListener('message', shake, false);
		});
	};

	return Model;
})();

module.exports = Postmate;

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// Note: Change the URL to where it is deployed to be able to test with demo-*.html pages.
const POSTMATE_TWETCH_PAY_URL = 'https://pay.twetch.com';
// const POSTMATE_TWETCH_PAY_URL='http://localhost:3000'
// const POSTMATE_TWETCH_PAY_URL='https://somesite.web.app'

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
			url: POSTMATE_TWETCH_PAY_URL,
			classListArray: ['twetchPayFrame']
		});
		this.iframe = this.child.frame;
		this.didInit = true;
		console.log('[PAY PARENT] - did init');
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
		console.log('[PAY PARENT] - pay()');

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
				console.log('cryptoOperations', { cryptoOperations });
				return onCryptoOperations && onCryptoOperations(cryptoOperations);
			});
		});
	}
}

const twetchPay = new TwetchPay();
module.exports = twetchPay;
