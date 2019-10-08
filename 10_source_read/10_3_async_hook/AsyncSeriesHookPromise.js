class AsyncSeriesHookPromise {
  constructor(args) {
    this.tasks = [];
  }

  tapPromise(name, task) {
    this.tasks.push(task);
  }

  promise(...args) {
    const [first, ...other] = this.tasks;
    return other.reduce((prev, next) => prev.then(() => next(...args)), first(...args));
  }
}

const hook = new AsyncSeriesHookPromise(["name"]);
hook.tapPromise("lesson1", name => new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("lesson1", name);
    resolve();
  }, 1000);
}));

hook.tapPromise("lesson2", name => new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("lesson2", name);
    resolve();
  }, 2000);
}));

hook.promise("jay").then(function () {
  console.log('end');
});
