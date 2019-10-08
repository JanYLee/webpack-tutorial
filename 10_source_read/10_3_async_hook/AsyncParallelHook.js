class AsyncParallelHook {
  constructor(args) {
    this.tasks = [];
  }

  tapAsync(name, task) {
    this.tasks.push(task);
  }

  callAsync(...args) {
    const finalCallback = args.pop();
    let index = 0;
    let done = () => {
      index++;
      if (index === this.tasks.length) {
        finalCallback();
      }
    };
    this.tasks.forEach(task => {
      task(...args, done);
    });
  }
}

const hook = new AsyncParallelHook(["name"]);
hook.tapAsync("lesson1", function(name, cb) {
  setTimeout(() => {
    console.log("lesson1", name);
    cb();
  }, 1000);
});

hook.tapAsync("lesson2", function(name, cb) {
  setTimeout(() => {
    console.log("lesson2", name);
    cb();
  }, 2000);
});

hook.callAsync("jay", function() {
  console.log("end");
});
