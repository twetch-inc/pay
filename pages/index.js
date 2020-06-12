import Head from 'next/head';
import PaymentPopup from '../components/payment-popup';
import { useEffect, useState } from 'react';
import Postmate from 'postmate';

const Home = () => {
	const [paymentProps, setPaymentProps] = useState({
		wallets: ['vbox', 'moneybutton', 'relayx'],
		outputs: [
			{
				to: "131xY3twRUJ1Y9Z9jJFKGLUa4SAdRJppcW", amount: 0.00001, currency: 'BSV'
			}
		],
		// debug: false,
		// appName: 'Twetch Pay',
		// appLogo: 'https://twetch-app.now.sh/static/favi.png',
		// productName: 'Purchase',
	});
	const [parent, setParent] = useState();

	const listenForPay = async () => {
		try {
			const p = await new Postmate.Model({
				pay: ({ props }) => {
					setPaymentProps({ ...paymentProps, ...props });
				}
			});
			p.emit('init', true);
			setParent(p);
		} catch (e) {
			const p = await new Postmate.Model({
				pay: ({ props }) => {
					setPaymentProps({ ...paymentProps, ...props });
				}
			});
			p.emit('init', true);
			setParent(p);
		}
	};

	useEffect(() => {
		listenForPay();
	});

	return (
		<div className="container">
			<Head>
				<title>Twetch Pay</title>
				<link rel="icon" href="/favicon.png" />
				<link rel="stylesheet" href="https://use.typekit.net/kwm6mcp.css" />
			</Head>
			<main>
				<PaymentPopup {...paymentProps} parent={parent} />
			</main>
			<style jsx global>{`
				html,
				body {
					height: 100%;
					max-height: 100%;
					padding: 0;
					margin: 0;
					font-family: proxima-nova, Helvetica;
				}

				* {
					box-sizing: border-box;
				}
			`}</style>
		</div>
	);
};

export default Home;
