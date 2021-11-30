const path = require("path");
const rules = require("./webpack.rules");
const plugins = require("./webpack.plugins");

module.exports = {
	target: "node",
	entry: "./src/index.ts",
	devtool: "source-map",
	output: {
		path: path.resolve(__dirname, "../dist"),
		filename: "index.js",
	},
	resolve: {
		alias: {
			__database__: path.resolve(__dirname, "../src/database"),
			__mapper__: path.resolve(__dirname, "../src/mapper/index"),
			"@ioc-container/config": path.resolve(
				__dirname,
				"../src/ioc-container/inversify.config"
			),
			"@ioc-container": path.resolve(__dirname, "../src/ioc-container"),
			"@models": path.resolve(__dirname, "../src/models"),
			"@services": path.resolve(__dirname, "../src/services"),
			"@routes": path.resolve(__dirname, "../src/routes"),
			"@helper": path.resolve(__dirname, "../src/helper"),
		},
		extensions: [".ts", ".js"],
	},
	module: {
		rules,
	},
	plugins,
	experiments: { topLevelAwait: true },
};
