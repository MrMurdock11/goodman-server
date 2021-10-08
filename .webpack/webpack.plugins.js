const NodemonPlugin = require("nodemon-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = [new NodemonPlugin(), new CleanWebpackPlugin()];
