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
			"@domain": path.resolve(__dirname, "src/domain"),
			"@helper": path.resolve(__dirname, "src/helper"),
		},
		extensions: [".ts", ".js"],
	},
	module: {
		rules,
	},
	plugins,
};
