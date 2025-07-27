// nearest greater to right [1,3,0,0,1,2,4]
const nearestToGreaterArr = [1, 3, 0, 0, 1, 2, 4]; //O(n)2
function findNearestToGreaterArr(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    let nearestToGreater = -1;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] > arr[i]) {
        nearestToGreater = arr[j];
        break;
      }
    }
    result.push(nearestToGreater);
  }
  return result;
}
console.log(findNearestToGreaterArr(nearestToGreaterArr));

// O(n)2
function findNearestToGreaterArr2(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    let flag = 0;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] > arr[i]) {
        result.push(arr[j]);
        flag = 1;
        break;
      }
    }
    if (flag === 0) {
      result.push(-1);
    }
  }
  return result;
}

console.log(findNearestToGreaterArr2(nearestToGreaterArr));

// by using stack o(n)
function findNearestToGreaterArr3(arr) {
  const result = new Array(arr.length).fill(-1);
  const stack = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    while (stack.length > 0 && stack[stack.length - 1] <= arr[i]) {
      stack.pop();
    }
    if (stack.length > 0) {
      result[i] = stack[stack.length - 1];
    }
    stack.push(arr[i]);
  }
  return result;
}

console.log(findNearestToGreaterArr3(nearestToGreaterArr));
