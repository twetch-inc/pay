module.exports = {
	experimental: {
		reactMode: 'concurrent'
	},
	webpack: config => {
		config.module.rules.push({
			test: /\.md$/,
			use: 'raw-loader'
		});

		return config;
	}
};
