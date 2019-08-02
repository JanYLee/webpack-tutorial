const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production', // 模式 production development
  entry: './src/index.js', // 文件入口
  output: { // 打包配置
    filename: 'bundle.[hash:8].js', // 打包后的文件名
    path: path.resolve(__dirname, 'dist'), // 入口路径, 需要写成绝对路径
  },
  devServer: { // 本地开发服务器配置
    port: 3000, // 修改端口号
    progress: true, // 显示进度条
    contentBase: './dist', // 设置静态服务器路径
    // open: true // 自动打开浏览器
  },
  plugins: [ // webpack插件
    new HtmlWebpackPlugin({
      template: './src/index.html', // html 模版文件
      filename: 'index.html', // 打包后文件名, 不写默认是模版文件名
      minify: { // 打包时的配置
        removeAttributeQuotes: true, // 移除html无用双引号
        collapseWhitespace: true, // 打包成一行
      },
      hash: true, // 引入js添加哈希戳, 解决缓存问题
    })
  ]
}