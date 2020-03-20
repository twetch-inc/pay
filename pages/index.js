import Head from 'next/head';
import PaymentPopup from '../components/payment-popup';
import { useEffect, useState } from 'react';
import Postmate from 'postmate';

const Home = () => {
	const [paymentProps, setPaymentProps] = useState({
		wallets: ['moneybutton', 'relayx']
	});
	const [parent, setParent] = useState();

	const listenForPay = async () => {
		const p = await new Postmate.Model({
			pay: ({ props }) => {
				setPaymentProps({ ...paymentProps, ...props });
			}
		});
		p.emit('init', true);
		setParent(p);
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
