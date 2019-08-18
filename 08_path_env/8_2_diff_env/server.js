const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();

// 获取配置对象
const config = require('./webpack.base.js');

// 用webpack处理配置文件, 返回编译结果
const compiler = webpack(config);

// 使用中间件处理编译结果
app.use(webpackDevMiddleware(compiler));

app.get('/user', (req, res) => {
  res.json({name: 'user test'});
})

app.listen(3000);
