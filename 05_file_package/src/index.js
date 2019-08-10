// import $ from 'jquery';
// console.log($);

// console.log(window.$);

// import str from './common.js';
// require('./index.css');
// require('./index.less');
// console.log(str);

// let fn = () => {
//   console.log('arrow function');
// }

// @log
// class A {
//   a = 1
// }

// function log(target) {
//   console.log(target);
// }

// let a = new A;
// console.log('a', a.a);

import ebon from './ebon.png'; // 把图片引入, 返回一个新的图片地址
const image = new Image();

console.log(ebon);
image.src = ebon;

document.body.appendChild(image);
