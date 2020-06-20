import ReactMarkdown from 'react-markdown';
import content from '../public/docs.md';

const Docs = () => {
	return (
		<div style={{ width: '100vw' }}>
			<div style={{ maxWidth: '100%', margin: '0 auto', width: '600px' }}>
				<ReactMarkdown source={content} />
			</div>
			<style jsx global>{`
				html,
				body {
					min-height: 100%;
					padding: 0;
					margin: 0;
					font-family: proxima-nova, Helvetica;
				}

				code {
					background: #dedede;
					line-height: 18px;
					padding: 0 4px;
					border-radius: 6px;
				}

				pre {
					border-radius: 6px;
					background: #dedede;
					padding: 12px;
				}

				* {
					box-sizing: border-box;
				}
			`}</style>
		</div>
	);
};

export default Docs;
