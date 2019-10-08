class SyncBailHook {
  constructor(args) {
    this.tasks = [];
  }

  tap(name, task) {
    this.tasks.push(task);
  }

  call(...args) {
    let ret; // 当前函数返回值
    let index = 0;
    do {
      ret = this.tasks[index++](...args);
    } while (ret === undefined && this.tasks.length > index);
  }
}

const hook = new SyncBailHook(["name"]);
hook.tap("lesson1", function(name) {
  console.log("lesson1", name);
  return "stop learning";
});

hook.tap("lesson2", function(name) {
  console.log("lesson2", name);
});

hook.call("jay");
