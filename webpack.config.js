const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  entry: './app/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude(filePath) {
          return filePath === path.join(__dirname, 'app', 'index.html');
        },
        use: {
          loader: 'html-es6-template-loader',
          options: {
            transpile: true,
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(s[ca]ss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif)/,
        use: {
          loader: 'url-loader',
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
