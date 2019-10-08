class AsyncSeriesWaterfallHook {
  constructor(args) {
    this.tasks = [];
  }

  tapAsync(name, task) {
    this.tasks.push(task);
  }

  callAsync(...args) {
    const finalCallback = args.pop();
    let counter = 0;
    const next = (err, data) => {
      let task = this.tasks[counter];
      if (!task) return finalCallback();
      if (counter === 0) {
        task(...args, next);
      } else {
        task(data, next);
      }
      counter++;
    };
    next();
  }
}

const hook = new AsyncSeriesWaterfallHook(["name"]);
hook.tapAsync("lesson1", function(name, cb) {
  setTimeout(() => {
    console.log("lesson1", name);
    cb(null, "lesson1 result");
  }, 1000);
});

hook.tapAsync("lesson2", function(name, cb) {
  setTimeout(() => {
    console.log("lesson2", name);
    cb(null);
  }, 2000);
});

hook.callAsync("jay", function() {
  console.log("end");
});
