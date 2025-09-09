//Promise.all

Promise.myPromiseAll = function (taskList) {
  const res = new Array(taskList.length);
  let count = 0;
  return new Promise((resolve, reject) => {
    for (let i = 0; i < taskList.length; i++) {
      Promise.resolve(taskList[i])
        .then((result) => {
          res[i] = result;
          count++;
          if (count === taskList.length) {
            resolve(res);
          }
        })
        .catch((err) => {
          resolve(err);
        });
    }
  });
};

const task1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("task 1");
  }, 1000);
});

const task2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("task 2");
  }, 500);
});

Promise.myPromiseAll([task1, task2])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

//Promise.AllSettled

Promise.myPromiseAllSettled = function (taskList) {
  const result = new Array(taskList.length);
  let count = 0;
  return new Promise((resolve) => {
    for (let i = 0; i < taskList.length; i++) {
      Promise.resolve(taskList[i])
        .then((value) => {
          result[i] = { status: "fullfilled", value };
        })
        .catch((reason) => {
          result[i] = { status: "rejected", reason };
        })
        .finally(() => {
          count++;
          if (count === taskList.length) {
            resolve(result);
          }
        });
    }
  });
};

const task3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("task 3");
  }, 1000);
});

const task4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("task 4");
  }, 500);
});

Promise.myPromiseAllSettled([task1, task2, task3, task4]).then((result) =>
  console.log(result)
);
