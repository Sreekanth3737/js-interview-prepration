function isObject(obj) {
  return obj !== null && typeof obj === "object";
}
function compareObject(obj1, obj2) {
  const objArr1 = Object.keys(obj1);
  const objArr2 = Object.keys(obj2);
  if (objArr1.length !== objArr2.length) return false;

  for (let key of objArr1) {
    const value1 = obj1[key];
    const value2 = obj2[key];
    const isValidObjects = isObject(value1) && isObject(value2);
    if (!isValidObjects && value1 !== value2) return false;
    if (isValidObjects && !compareObject(value1, value2)) return false;
  }
  return true;
}

const obj1 = { a: 5, b: 3, c: { z: [4] } };
const obj2 = { a: 5, b: 3, c: { z: [4] } };

console.log(compareObject(obj1, obj2));
