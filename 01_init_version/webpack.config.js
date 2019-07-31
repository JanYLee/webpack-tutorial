const path = require('path');

module.exports = {
  mode: 'development', // 模式 production development
  entry: './src/index.js', // 文件入口
  output: { // 打包配置
    filename: 'bundle.js', // 打包后的文件名
    path: path.resolve(__dirname, 'dist'), // 入口路径, 需要写成绝对路径
  }
}