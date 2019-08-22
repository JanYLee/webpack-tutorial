const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    react: ['react', 'react-dom'],
  },
  output: {
    filename: '_dll_[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: '_dll_[name]', // 指定打包后的模块名称
    // libraryTarget: 'var', // 打包模块的暴露方式, 支持cmd, umd
  },
  plugins: [
    new webpack.DllPlugin({ // name === library
      name: '_dll_[name]',
      path: path.resolve(__dirname, 'dist', 'manifest.json'), // 在dist目录下生成一个打包模块的人物清单
    })
  ]
}