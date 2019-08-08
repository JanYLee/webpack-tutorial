const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

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
    }),
    // 将css抽离出来并命名为main.css
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
  ],
  module: { // 模块
    rules: [ // 规则
      // css-loader 用于解析@import 'xxx.css'语法
      // style-loader 用于把css插入head标签中
      // loader特点 希望功能单一
      // loader有顺序, 默认从右向左或从下至上
      { 
        test: /\.css$/, 
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      { // 处理less文件
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader' // 把less转为css
        ]
      },
      {
        test: require.resolve('jquery'),
        use: 'expose-loader?$'
      },
      {
        test: /\.js$/,
        use: {
          loader: 'eslint-loader',
          options: {
            enforce: 'pre' // 优先执行这个loader
          }
        }
      },
      { // 处理js
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: { // babel-loader 需要把es6转为es5
            presets: [
              '@babel/preset-env'
            ],
            "plugins": [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose" : true }],
              "@babel/plugin-transform-runtime" // 运行环境包
            ]
          }
        },
        include: path.resolve(__dirname, 'src'), // 包含文件夹
        exclude: /node_modules/ // 排除文件夹
      }
    ]
  },
  optimization: { // 优化项
    minimizer: [
      new UglifyJsPlugin({
        cache: true, // 是否使用缓存
        parallel: true, // 是否并发打包
        sourceMap: true, // 是否打开源码映射方便调试
      }),
      new OptimizeCssAssetsPlugin()
    ]
  }
}