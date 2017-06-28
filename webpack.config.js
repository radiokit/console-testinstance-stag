var path = require('path');
var webpack = require('webpack');

var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
  devtool: 'eval',

  entry: [
    'whatwg-fetch',
    'bootstrap-loader',
    'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    path.resolve(__dirname, 'app/main.js')
  ],

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // This will force moment to load only specified languages.
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /pl|en/),
    new webpack.DefinePlugin({
      process: {env: { NODE_ENV: "'testing'"}}
    }),
  ],

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  module: {
    loaders: [{
      test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
      loader: 'imports?jQuery=jquery'
    }, {
      test: /\.jsx$/,
      exclude: [node_modules_dir],
      loaders: ['react-hot']
    }, {
      test: /\.jsx?$/,
      exclude: [node_modules_dir],
      loader: 'babel',
      query: {
        sourceMaps: 'inline'
      }
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
  },

  resolve: {
    alias: {
      'React': 'react',
    }
  }
};

module.exports = config;
