const Styles = () => (
	<style jsx>{`
		.twetch-pay-container {
			height: 100vh;
			width: 100vw;
			background: rgba(0, 0, 0, .5);
			display: flex;
			flex-direction: column;
		}

		.twetch-pay-grow {
			flex-grow: 1;
		}

		.twetch-pay-wrapper {
			display: flex;
		}

		.twetch-pay {
			width: 600px;
			max-width: calc(100% - 24px);
			background: white;
			border-radius: 6px 6px 0 0;
		}

		.twetch-pay-header {
			padding: 16px;
			display: flex;
		}

		.twetch-pay-logo {
			height: 22px;
		}

		.twetch-pay-close {
			font-size: 18px;
			line-height: 21px;
			color: #BDBDBD;
			margin: 0;
			font-weight: normal;
			cursor: pointer;
		}

		.twetch-pay-body {
			padding: 16px;
			border-top: 2px solid #F2F2F2;
		}

		.twetch-pay-bumper {
			height: 10vh;
		}
	`}</style>
);

export default Styles;
