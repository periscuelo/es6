const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const minify = {
  collapseWhitespace: true,
  conservativeCollapse: true,
  removeComments: true,
};

const config = {
  entry: {
    main: './app/index.js',
    oldMessages: './app/old-messages.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash:8].bundle.js',
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
        },
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
      filename: 'index.html',
      chunks: ['commons', 'main'],
      minify,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app', 'old-messages.html'),
      filename: 'old-messages.html',
      chunks: ['commons', 'oldMessages'],
      minify,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css',
      chunkFilename: '[id].[hash:8].css',
    }),
    new UglifyJsWebpackPlugin(),
    new CompressionWebpackPlugin({
      asset: '[path].gz',
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
            presets: [
              ['@babel/preset-env', { modules: false }],
            ],
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
        test: /\.(jpe?g|png|gif|svg)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5000,
              name: '[name].[hash:8].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: { quality: 65 },
            },
          },
        ],
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
