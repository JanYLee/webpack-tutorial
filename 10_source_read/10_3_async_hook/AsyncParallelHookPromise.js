class AsyncParallelHookPromise {
  constructor(args) {
    this.tasks = [];
  }

  tapPromise(name, task) {
    this.tasks.push(task);
  }

  promise(...args) {
    let tasks = this.tasks.map(task => task(...args));
    return Promise.all(tasks);
  }
}

const hook = new AsyncParallelHookPromise(["name"]);
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
