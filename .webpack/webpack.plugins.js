const NodemonPlugin = require("nodemon-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = [
	new NodemonPlugin(),
	new CleanWebpackPlugin(),
	new CopyWebpackPlugin({
		patterns: [{ from: "db.json", to: "db.json" }],
	}),
];
