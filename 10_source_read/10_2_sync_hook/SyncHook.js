class SyncHook {
  constructor(args) {
    this.tasks = [];
  }

  tap(name, task) {
    this.tasks.push(task);
  }

  call(...args) {
    this.tasks.forEach(task => task(...args));
  }
}

const hook = new SyncHook(["name"]);
hook.tap("lesson1", function(name) {
  console.log("lesson1", name);
});

hook.tap("lesson2", function(name) {
  console.log("lesson2", name);
});

hook.call("jay");
