import Head from 'next/head';
import PaymentPopup from '../components/payment-popup';

const Home = () => (
	<div className="container">
		<Head>
			<title>Twetch Pay</title>
			<link rel="icon" href="/favicon.ico" />
			<link rel="stylesheet" href="https://use.typekit.net/kwm6mcp.css" />
		</Head>
		<main>
			<PaymentPopup />
		</main>
		<style jsx global>{`
			html,
			body {
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

export default Home;
