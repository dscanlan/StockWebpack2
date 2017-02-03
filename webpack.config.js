const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

const ip = require('ip');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'src');

//below should be alist of packages in the dependency part of package.json
const VENDOR_LIBS = [
  'axios', 'lodash', 'moment',
  'react', 'react-dom', 'react-router', 'react-redux', 
  'redux', 'redux-form', 'redux-thunk',
  'react-big-calendar', 'react-infinite-calendar',
];

const config = {
  entry: {
    bundle: `${APP_DIR}/index.js`,
    vendor: VENDOR_LIBS
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        loader: ExtractTextPlugin.extract({
            loader: 'css-loader'
        }),
        test: /\.css$/
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff|ttf|eot)$/, 
        use: [{
            loader: 'url-loader',
            options: { limit: 400 }
          },
          'image-webpack-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${APP_DIR}/index.html`
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new ExtractTextPlugin('style.css'),
    new CopyWebpackPlugin([
     
    ]),
    new AssetsPlugin({ 
      path: `${BUILD_DIR}`,
      includeManifest: 'manifest',
      filename: 'assets.json'
    })
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: './src',
    //host: ip.address(),
    port: 3001
  }
};

module.exports = config;
