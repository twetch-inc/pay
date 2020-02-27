const Styles = () => (
	<style jsx="true">{`
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

		.twetch-pay-form-control {
			margin-top: 0;
			margin-bottom: 0;
		}

		.twetch-pay-select {
			color: #696969;
			font-size: 14px;
			line-height: 17px;
		}

		.twetch-pay-menu-list {
			padding: 0;
		}

		.twetch-pay-menu-item {
			font-size: 14px;
			line-height: 20px;
			color: #696969;
			padding: 12px
		}

		.twetch-pay-menu-item-selected {
			color: #FFFFFF;
			background-color: #085AF6 !important;
		}

		.twetch-pay-select-outlined {
			border: 1px solid #F2F2F2 !important;
		}

		.MuiOutlinedInput-notchedOutline {
			border-color: #F2F2F2 !important;
			border-width: 1px !important;
		}
	`}</style>
);

export default Styles;
