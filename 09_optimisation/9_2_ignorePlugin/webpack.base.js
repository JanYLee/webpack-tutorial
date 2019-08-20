const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development', // development, production
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: { // 解析
    modules: [path.resolve(__dirname, 'src'), 'node_modules'], // 解析第三方包
    extensions: ['.js', '.css'],
    mainFields: ['style', 'main'],
    alias: {
      '@common': path.resolve(__dirname, 'src/common/'),
      '@img': path.resolve(__dirname, 'src/img/'),
    }
  },
  module: {
    noParse: /jquery/, // 不解析jquery
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$|\.ico$/,
        loader: "file-loader"
      },
      {
        test: /\.js$/,
        exclude: '/node_modules', // 排除node_modules
        include: path.resolve('src'), // 只解析src目录
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new webpack.BannerPlugin({
      banner: 'hash:[hash], chunkhash:[chunkhash], name:[name], filebase:[filebase], query:[query], file:[file]'
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    })
  ]
}