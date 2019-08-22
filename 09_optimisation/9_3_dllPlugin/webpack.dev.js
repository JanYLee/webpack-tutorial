const { smart } = require('webpack-merge');
const base = require('./webpack.base.js')
const webpack = require('webpack');

module.exports = smart(base, {
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify('dev')
    }),
  ]
})