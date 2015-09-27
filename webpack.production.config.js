var path = require('path');

var node_modules_dir = path.resolve(__dirname, 'node_modules');


var config = {
  entry: path.resolve(__dirname, 'app/main.js'),

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: [node_modules_dir],
      loader: 'babel'
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