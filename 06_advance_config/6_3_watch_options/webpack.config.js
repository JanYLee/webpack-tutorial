const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production', // development, production
  entry: {
    home: './src/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      }
    ]
  },
  watch: true,
  watchOptions: { // 监控选项
    poll: 1000, // 每秒监控1000次
    aggregateTimeout: 300, // 防抖 类似输入框防抖, 如输入代码停止后300毫秒才打包
    ignored: /node_modules/ // 不监控的代码
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
    })
  ]
}