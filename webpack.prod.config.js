var path = require('path');

var node_modules_dir = path.resolve(__dirname, 'node_modules');


var config = {
  entry: path.resolve(__dirname, 'app/main.js'),

  output: {
    path: '/tmp/site-console-prod', // That is expected in ./release.sh
    publicPath: "/",
    // publicPath: "assets/[hash]/", // FIXME we should prefix assets, too
    filename: "output.[hash].bundle.js",
    chunkFilename: "[id].[hash].bundle.js"
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: [node_modules_dir],
      loader: 'babel'
    }, {
      include: /\.json$/,
      loaders: ['json-loader']
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.scss$/,
      loader: 'style!css!sass'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=25000'
    }, {
      test: /\.(woff|ttf|eot|woff2|svg)$/,
      loader: 'url?limit=100000'
    }]
  }
};

module.exports = config;