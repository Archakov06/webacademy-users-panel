'use strict';

var path = require('path');
var webpack = require('webpack');

const APP_FILENAME = 'index';
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src/js/' + APP_FILENAME + '.js');
const BUILD_PATH = path.resolve(ROOT_PATH, 'public');

module.exports = {
    entry: APP_PATH,
    output: {
        path: BUILD_PATH + '/js/',
        publicPath: BUILD_PATH + '/',
        filename: APP_FILENAME + '.js',
    },
    watch: true,
    module: {
      loaders: [
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /(\.css$|\.styl$)/,
        loader: 'style-loader!css-loader!stylus-loader'
      }
      ]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
      })
    ]
};
