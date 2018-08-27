const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: './app/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app', 'index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'html-es6-template-loader',
          options: {
            transpile: true,
          },
        },
      },
    ],
  },
};

if (process.env.NODE_ENV === 'development') {
  config.mode = 'development';
  config.watch = true;
  config.devtool = 'source-map';
} else if (process.env.NODE_ENV === 'hot') {
  config.devtool = 'source-map';
  config.devServer = {
    hot: true,
  };
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
} else if (process.argv[process.argv.indexOf('--mode') + 1] === 'development') {
  config.watch = true;
  config.devtool = 'source-map';
}

module.exports = config;
