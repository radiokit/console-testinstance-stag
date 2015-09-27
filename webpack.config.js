var path = require('path');

var config = {
  entry: path.resolve(__dirname, 'app/main.js'),

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
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