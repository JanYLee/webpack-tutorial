import calc from './common.js';
// import 在生产模式下, 会自动去除掉没用的代码
// tree-shaking 会把没用的代码删除掉
// es6 模块代码会把结果反倒default上
// const calc = require('./common.js');
// console.log(calc);
console.log(calc.sum(1, 2));

let a = 1;
let b = 2;
let c = 3;
let d = a + b + c;
console.log('d----', d);

