const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const Happypack = require('happypack');

module.exports = {
  mode: 'development', // development, production
  entry: {
    index: './src/index.js',
  },
  devServer: {
    hot: true, // 启用热更新
    port: 3000,
    contentBase: './dist'
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
            ],
            plugins: [
              '@babel/plugin-syntax-dynamic-import'
            ]
          }
        },
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
    }),
    new webpack.NamedModulesPlugin(), // 打印更新模块路径
    new webpack.HotModuleReplacementPlugin(), // 热更新插件
  ]
}