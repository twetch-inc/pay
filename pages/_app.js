import Head from 'next/head';
import Theme from '../components/theme';
import { JssProvider } from 'react-jss';
import Postmate from 'postmate';
import { useEffect, useState } from 'react';
import twetchPay from '../modules/home/twetch-pay';

const App = ({ Component, pageProps }) => {
	const [parent, setParent] = useState();

	useEffect(() => {
		async function handshake() {
			try {
				const p = await new Postmate.Model({ token: 'foo' });
				setParent(p);
				p.emit('init', true);
				await twetchPay.init();
			} catch (e) {
				const p = await new Postmate.Model({ token: 'foo' });
				setParent(p);
				p.emit('init', true);
				await twetchPay.init();
			}
		}
		handshake();
	}, []);

	return (
		<>
			<Head>
				<title>Twetch Auth</title>
				<link rel="icon" href="https://cimg.twetch.com/assets/favicon.png" />
				<link rel="stylesheet" href="https://use.typekit.net/kwm6mcp.css" />
			</Head>
			<JssProvider>
				<Theme>
					<Component {...pageProps} parentFrame={parent} />
				</Theme>
			</JssProvider>
			<style jsx global>{`
				html,
				body {
					height: 100%;
					max-height: 100%;
					padding: 0;
					margin: 0;
					font-family: proxima-nova, Helvetica;
					background: #f2f2f2;
				}

				* {
					box-sizing: border-box;
				}
			`}</style>
		</>
	);
};

export default App;
