const { AsyncSeriesWaterfallHook } = require("./tapable/lib/index.js");

class Lesson {
  constructor(props) {
    // 创建钩子
    this.hooks = {
      arch: new AsyncSeriesWaterfallHook(["name"])
    };
  }

  tap() {
    this.hooks.arch.tapPromise("lesson1", name => new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("lesson1", name);
        resolve("lesson1 result");
      }, 1000);
    }));
    this.hooks.arch.tapPromise("lesson2", data => new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("lesson2", data);
        resolve();
      }, 2000);
    }));
  }

  start() {
    this.hooks.arch.promise("jay").then(function() {
      console.log('end');
    });
  }
}

let l = new Lesson();
l.tap();
l.start(); // 启动钩子
