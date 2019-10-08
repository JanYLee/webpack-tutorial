const { SyncLoopHook } = require("./tapable/lib/index.js");

class Lesson {
  constructor(props) {
    // 创建钩子
    this.hooks = {
      arch: new SyncLoopHook(["name"])
    };
    this.counter = 0;
  }

  tap() {
    // 注册监听函数
    // 注册了两个事件, 叫lesson1和lesson2
    this.hooks.arch.tap("lesson1", name => {
      console.log("lesson1", name);
      return ++this.counter === 3 ? undefined : "continue";
    });
    this.hooks.arch.tap("lesson2", data => {
      console.log("lesson2", data);
    });
  }

  start() {
    this.hooks.arch.call("jay");
  }
}

let l = new Lesson();
l.tap(); // 把lesson1和lesson2的时间分别注册到一个数组中
l.start(); // 启动钩子
