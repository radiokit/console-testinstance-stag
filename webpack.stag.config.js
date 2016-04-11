var path = require('path');
var webpack = require('webpack');
var ClosureCompilerPlugin = require('webpack-closure-compiler');

var node_modules_dir = path.resolve(__dirname, 'node_modules');


var config = {
  entry: [
    'bootstrap-loader',
    path.resolve(__dirname, 'app/main.js')
  ],

  output: {
    path: '/tmp/site-console-stag', // That is expected in ./release.sh
    publicPath: "/",
    // publicPath: "assets/[hash]/", // FIXME we should prefix assets, too
    filename: "output.[hash].bundle.js",
    chunkFilename: "[id].[hash].bundle.js"
  },

  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|pl/),
    new ClosureCompilerPlugin({
      compiler: {
        language_in: 'ECMASCRIPT6',
        language_out: 'ECMASCRIPT5',
        compilation_level: 'SIMPLE'
      },
      concurrency: 3,
    })
  ],

  module: {
    loaders: [{
      test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
      loader: 'imports?jQuery=jquery'
    }, {
      test: /\.jsx?$/,
      exclude: [node_modules_dir],
      loader: 'babel'
    }, {
      include: /\.json$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      loader: 'style!css!autoprefixer'
    }, {
      test: /\.scss$/,
      loader: 'style!css!sass!autoprefixer'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=25000'
    }, {
      test: /\.(ttf|eot|svg|woff(2)?)([\?].*)?$/,
      loader: 'file-loader'
    }]
  }
};

module.exports = config;
