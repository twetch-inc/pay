import Head from 'next/head';
import PaymentPopup from '../components/payment-popup';

const Home = () => (
	<div className="container">
		<Head>
			<title>Twetch Pay</title>
			<link rel="icon" href="/favicon.png" />
			<link rel="stylesheet" href="https://use.typekit.net/kwm6mcp.css" />
		</Head>
		<main>
			<PaymentPopup />
		</main>
		<style jsx global>{`
			html,
			body {
				height: 100vh;
				max-height: 100vh;
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

export default Home;
