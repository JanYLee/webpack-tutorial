const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // 模式 production development
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
  ],
  module: { // 模块
    rules: [ // 规则
      // css-loader 用于解析@import 'xxx.css'语法
      // style-loader 用于把css插入head标签中
      // loader特点 希望功能单一
      // loader有顺序, 默认从右向左或从下至上
      { 
        test: /\.css/, 
        use: [
          {
            loader: 'style-loader',
            options: { // loader的配置
              insertAt: 'top' // 将css插入到head顶部, 不影响手动写在html中的css
            }
          },
          'css-loader'
        ] 
      }
    ]
  }
}