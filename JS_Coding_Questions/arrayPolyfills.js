function isValidFunction(fun) {
  return typeof fun === "function";
}
// map
Array.prototype.myMap = function (callback) {
  if (!isValidFunction(callback)) {
    throw new Error("callback is not a function");
  }
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};

Array.prototype.myFilter = function (callback) {
  if (!isValidFunction(callback)) {
    throw new Error("callback is not a function");
  }
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

Array.prototype.myReduce = function (calback, initialValue) {
  if (!isValidFunction(calback)) {
    throw new Error("callback is not a function");
  }
  let acc = initialValue !== undefined ? initialValue : this[0];

  const startIndex = initialValue !== undefined ? 0 : 1;
  for (let i = startIndex; i < this.length; i++) {
    acc = calback(acc, this[i], i, this);
  }
  return acc;
};

Array.prototype.myForEach = function (callback) {
  if (!isValidFunction(callback)) {
    throw new Error("callback is not a function");
  }
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this);
  }
};

Array.prototype.myEvery = function (calback) {
  if (!isValidFunction(calback)) {
    throw new Error("callback is not a function");
  }
  for (let i = 0; i < this.length; i++) {
    if (!calback(this[i], i, this)) {
      return false;
    }
  }
  return true;
};

Array.prototype.mySome = function (calback) {
  if (!isValidFunction(calback)) {
    throw new Error("callback is not a function");
  }
  for (let i = 0; i < this.length; i++) {
    if (calback(this[i], i, this)) {
      return true;
    }
  }
  return false;
};

const arr = [1, 2, 3, 4, 5];

// using
const doubledArr = arr.myMap((num) => num * 2);
console.log(doubledArr); // [2,4,6,8,10]

const filteredArr = arr.myFilter((num) => num > 2);
console.log(filteredArr);

const reduceArr = arr.myReduce((acc, cur) => acc + cur, 0);
console.log(reduceArr);

const forEachArr = arr.myForEach((num) => console.log(num));

const everyArr = arr.myEvery((num) => num > 0);
console.log(everyArr); // true
const someArr = arr.mySome((num) => num > 3);
console.log(someArr); // true

const originalPush = Array.prototype.push;
console.log(originalPush.call(arr, 6)); // 6
