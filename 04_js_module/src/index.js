let str = require('./common.js');
require('./index.css');
require('./index.less');
console.log(str);

let fn = () => {
  console.log('arrow function');
}

@log
class A {
  a = 1
}

function log(target) {
  console.log(target);
}

let a = new A;
console.log('a', a.a);