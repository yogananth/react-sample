'use strict';

var ReactStylePlugin = require('react-style-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var webpack = require('webpack');

module.exports = {
  devtool: 'sourcemap',
  entry: ['webpack/hot/dev-server', './demo/app.js'],
  output: {
    filename: "bundle.js",
    publicPath: "/build/",
    path: __dirname + "/build"
  },
  // resolve: {
  //   alias: {
  //     'react$': require.resolve('../../../node_modules/react'),
  //     'react-style$': require.resolve('../../../lib/index')
  //   }
  // },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader' //,
          // ReactStylePlugin.loader(),
          // 'jsx-loader?harmony'
        ]
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader')
      },
      {
        test: /\.(otf|eot|svg|ttf|woff)/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        // To enable production mode:
        // NODE_ENV: JSON.stringify('production')
      }
    })
  ]
};