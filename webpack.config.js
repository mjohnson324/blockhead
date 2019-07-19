module.exports = {
    entry: "./assets/JavaScript/blockhead.js",
    output: {
        path: __dirname + "/assets/JavaScript/bundle",
        filename: "bundle.js"
    },
    devtool: "source-maps",
    resolve: {
        extensions: [".js"]
    },
    mode: "production",
};
