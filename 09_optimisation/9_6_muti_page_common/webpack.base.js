const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const Happypack = require('happypack');

module.exports = {
  mode: 'development', // development, production
  entry: {
    index: './src/index.js',
    other: './src/other.js',
  },
  optimization: {
    splitChunks: { // 分割代码块
      cacheGroups: { // 缓存组
        common: { // 公共模块
          chunks: 'initial', // 从哪开始缓存, 这里从入口文件开始
          minSize: 0, // 代码大于多少字节时缓存
          minChunks: 2, // 引用多少次以上时时缓存
        },
        verndor: {
          priority: 1, // 权重, 优先抽离第三方模块
          test: /node_modules/,
          chunks: 'initial', 
          minSize: 0, 
          minChunks: 2, 
        }
      }
    }
  },
  devServer: {
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
    })
  ]
}