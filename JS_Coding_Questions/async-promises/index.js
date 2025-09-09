// Execute async function in series

// Runs async tasks in series
async function runTasksInSeries(tasks) {
  for (let task of tasks) {
    try {
      const result = await task;
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}

// Creates a single async task
async function asyncSeriesTasks(i) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(i);
    }, 500);
  });
}

// Array of promises (started immediately)
const taskPromises = [
  asyncSeriesTasks(1),
  asyncSeriesTasks(2),
  asyncSeriesTasks(3),
  asyncSeriesTasks(4),
];

// Execute tasks
runTasksInSeries(taskPromises);

// execute async function in parallel

// Runs async tasks in parallel (callback style)
function runTasksInParallel(tasks, onComplete) {
  const results = [];
  let completed = 0;

  tasks.forEach((task, index) => {
    task((value) => {
      results[index] = value; // preserve order
      completed++;
      if (completed === tasks.length) {
        onComplete(results);
      }
    });
  });
}

// Factory: creates a single async task
function createAsyncTask() {
  const value = Math.floor(Math.random() * 10);
  return function (done) {
    setTimeout(() => {
      done(value);
    }, 500);
  };
}

// Collection of tasks
const tasks = [createAsyncTask(), createAsyncTask(), createAsyncTask()];

// Run tasks
runTasksInParallel(tasks, (results) => console.log(results));
