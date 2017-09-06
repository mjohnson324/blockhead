module.exports = {
  entry: "./JavaScript/blockhead.js",
  output: {
    path: __dirname + "/JavaScript",
    filename: "bundle.js"
	},
	devtool: "source-maps",
  resolve: {
    extensions: [".js"]
  }
};
