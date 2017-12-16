var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
    context: __dirname,
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./js/app.js",
    output: {
        path: __dirname + "/js",
        filename: "app.min.js"
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
    ],
    module: {
      loaders: [{
          test: /\js\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
      }]
    }
};
