function deepcopy(object, seen = new WeakMap()) {
  if (object === null || typeof object !== "object") {
    return object;
  }
  if (seen.has(object)) {
    return seen.get(object);
  }
  if (object instanceof Date) {
    return new Date(object.getTime());
  }
  if (Array.isArray(object)) {
    const cloneArr = [];
    object.forEach((item, index) => {
      seen.set(object, cloneArr);
      cloneArr[index] = deepcopy(item, seen);
    });
    return cloneArr;
  }
  const cloneObj = {};
  seen.set(object, cloneObj);
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      cloneObj[key] = deepcopy(object[key], seen);
    }
  }
  return cloneObj;
}

// deepcopy testing
const a = {
  x: 1,
  y: { z: 2 },
  arr: [1, 2, [3]],
  createdAt: new Date("2023-08-29T12:00:00Z"),
};
// a.self = a; // circular reference

const b = deepcopy(a);

b.arr.push(4);
console.log(b);
console.log(a);
b.createdAt.setFullYear(2030);
// deep cloned object
console.log(b !== a); // true
console.log(b.y !== a.y); // true
console.log(b.arr !== a.arr); // true
