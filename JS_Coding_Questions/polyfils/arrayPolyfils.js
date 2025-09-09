const arr = [1, 2, 3, 4, 5, 6, 7];
// forEach

Array.prototype.myForEach = function (callback, thisArg) {
  if (this === null) {
    throw new TypeError(
      "Array.prototype.myForEach called on null or undefined"
    );
  }
  if (typeof callback !== "function")
    throw new TypeError(callback + " is not a function");

  const boundFn = thisArg !== undefined ? callback.bind(thisArg) : callback;

  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      boundFn(this[i], i, this);
    }
  }
};

function printArr(item) {
  console.log(item);
}
arr.myForEach(printArr);

// map
Array.prototype.myMap = function (callback, thisArg) {
  if (this === null) {
    throw new TypeError("Array.prototype.myMap called on null or undefined");
  }
  if (typeof callback !== "function")
    throw new TypeError(callback + " is not a function");

  const result = [];
  const boundFn = thisArg !== undefined ? callback.bind(thisArg) : callback;

  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      result.push(boundFn(this[i], i, this));
    }
  }
  return result;
};

function mappArr(item, i, arr) {
  return item * item;
}

console.log(arr.myMap(mappArr));

//Filter
Array.prototype.myFilter = function (callback, thisArg) {
  if (this === null) {
    throw new TypeError("Array.prototype.myFilter called on null or undefined");
  }
  if (typeof callback !== "function")
    throw new TypeError(callback + " is not a function");
  const result = [];
  const boundFn = thisArg !== undefined ? callback.bind(thisArg) : callback;

  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      if (boundFn(this[i], i, this)) {
        result.push(this[i]);
      }
    }
  }
  return result;
};
console.log(arr.myFilter((item, i, arr) => item > 3));

// Reduce
Array.prototype.myReduce = function (callback, initialValue) {
  if (this === null) {
    throw new TypeError("Array.prototype.myReduce called on null or undefined");
  }
  if (typeof callback !== "function")
    throw new TypeError(callback + " is not a function");
  let accumulator = initialValue !== undefined ? initialValue : this[0];
  let startIndex = initialValue !== undefined ? 0 : 1;

  for (let i = startIndex; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }
  return accumulator;
};

function myReduceFn(accumulator, currItem, i, arr) {
  return accumulator + currItem;
}
console.log(arr.myReduce(myReduceFn));

// Every
Array.prototype.myEvery = function (callback, thisArg) {
  if (this === null) {
    throw new TypeError("Array.prototype.myEvery called on null or undefined");
  }
  if (typeof callback !== "function")
    throw new TypeError(callback + " is not a function");
  const boundFn = thisArg !== undefined ? callback.bind(thisArg) : callback;

  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      if (!boundFn(this[i], i, this)) {
        return false;
      }
    }
  }

  return true;
};
console.log(arr.myEvery((i) => i > 0));

//Some
Array.prototype.mySome = function (callback, thisArg) {
  if (this == null)
    throw new TypeError("Array.prototype.some called on null or undefined");
  if (typeof callback !== "function")
    throw new TypeError(callback + " is not a function");
  const boundFn = thisArg !== undefined ? callback.bind(thisArg) : callback;

  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      if (boundFn(this[i], i, this)) {
        return true;
      }
    }
  }

  return false;
};

// Array flat [1,2,[3,4,[7,9]]] recursive

Array.prototype.myFlat = function (depth) {
  if (!Array.isArray(this)) {
    throw new TypeError("The first argument must be an array.");
  }

  let result = [];

  if (depth === 0) return this;

  for (let ele of this) {
    if (Array.isArray(ele) && depth > 0) {
      result.push(...ele.myFlat(depth - 1));
    } else {
      result.push(ele);
    }
  }

  return result;
};
//  by stack
Array.prototype.myFlatByStack = function () {
  if (!Array.isArray(this)) {
    throw new TypeError("The first argument must be an array.");
  }
  const stack = [...this];
  const res = [];
  while (stack.length) {
    const item = stack.pop();
    if (Array.isArray(item)) {
      stack.push(...item);
    } else {
      res.push(item);
    }
  }
  return res;
};

// testing with context thisArg

const testContext = {
  multiplier: 10,
  threshold: 3,
  name: "TestContext",
  log: function (value) {
    console.log(`[${this.name}] Value: ${value}`);
  },
};

arr.myForEach(function (item, index) {
  this.log(item * this.multiplier);
}, testContext);

const multiplied = arr.myMap(function (item) {
  return item * this.multiplier + 10;
}, testContext);
console.log(multiplied);

const filterGreaterThanThree = arr.myFilter(function (item) {
  return item > this.threshold;
}, testContext);
console.log(filterGreaterThanThree); // for every and some also we can do like similar

const flatArr = [1, 2, [3, 4, [7, 9]]].myFlat(2);
console.log(flatArr);

const flatArrByStack = [1, 2, [3, 4, [7, 9]]].myFlatByStack().reverse();
console.log(flatArrByStack);
