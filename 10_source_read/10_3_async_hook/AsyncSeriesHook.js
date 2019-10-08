class AsyncSeriesHook {
  constructor(args) {
    this.tasks = [];
  }

  tapAsync(name, task) {
    this.tasks.push(task);
  }

  callAsync(...args) {
		const finalCallback = args.pop();
		let counter = 0; // 判断执行了多少个异步回调
    let next = () => {
			if(this.tasks.length === counter) return finalCallback(); // 当执行的异步回调函数和任务数相同时, 执行最后的回调函数
			let task = this.tasks[counter++];
			task(...args, next);
		}
		next();
  }
}

const hook = new AsyncSeriesHook(["name"]);
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
