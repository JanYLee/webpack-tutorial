class SyncLoopHook {
  constructor(args) {
    this.tasks = [];
  }

  tap(name, task) {
    this.tasks.push(task);
  }

  call(...args) {
    this.tasks.forEach(task => {
      let ret;
      do {
        ret = task(...args);
      } while (ret !== undefined);
    });
  }
}

let counter = 0;
const hook = new SyncLoopHook(["name"]);
hook.tap("lesson1", function(name) {
  console.log("lesson1", name);
  return ++counter === 3 ? undefined : "continue";
});

hook.tap("lesson2", function(data) {
  console.log("lesson2", data);
});

hook.call("jay");
