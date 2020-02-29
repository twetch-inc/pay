import Head from 'next/head';
import PaymentPopup from '../components/payment-popup';
import { useEffect, useState } from 'react';

const Home = () => {
	const [paymentProps, setPaymentProps] = useState({
		wallets: ['moneybutton', 'relayx']
	});

	useEffect(() => {
		window.addEventListener(
			'message',
			event => {
				const data = event.data;
				if (data && typeof data === 'object' && data.from === 'twetch-pay') {
					setPaymentProps({ ...paymentProps, ...data.props, origin: event.origin });
				}
			},
			false
		);
	});

	return (
		<div className="container">
			<Head>
				<title>Twetch Pay</title>
				<link rel="icon" href="/favicon.png" />
				<link rel="stylesheet" href="https://use.typekit.net/kwm6mcp.css" />
			</Head>
			<main>
				<PaymentPopup {...paymentProps} />
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

				body:last-child {
					position: fixed;
				}

				* {
					box-sizing: border-box;
				}
			`}</style>
		</div>
	);
};

export default Home;
