class SyncWaterfallHook {
  constructor(args) {
    this.tasks = [];
  }

  tap(name, task) {
    this.tasks.push(task);
  }

  call(...args) {
    const [first, ...other] = this.tasks;
    const ret = first(...args);
    other.reduce((prev, next) => next(prev), ret);
  }
}

const hook = new SyncWaterfallHook(["name"]);
hook.tap("lesson1", function(name) {
  console.log("lesson1", name);
  return "lesson1 result";
});

hook.tap("lesson2", function(data) {
  console.log("lesson2", data);
});

hook.call("jay");
