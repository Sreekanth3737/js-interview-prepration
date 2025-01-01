// Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.

// Example 1:

// Input: nums = [1,2,3,4,5,6,7], k = 3
// Output: [5,6,7,1,2,3,4]
// Explanation:
// rotate 1 steps to the right: [7,1,2,3,4,5,6]
// rotate 2 steps to the right: [6,7,1,2,3,4,5]
// rotate 3 steps to the right: [5,6,7,1,2,3,4]

function rotateArray(arr = [1, 2, 3, 4, 5, 6, 7], k = 3) {
  // let i = 0;
  // while (i < k) {
  //   const next = arr.pop();
  //   arr.unshift(next);
  //   i++;
  // }
  // return arr;

  // **efficient O(n)
  const length = arr.length;
  k %= length;
  console.log(...arr.slice(-k), "slice", ...arr.slice(0, length - k));
  return [...arr.slice(-k), ...arr.slice(0, length - k)];
}
console.log(rotateArray(), "111");

const rotate = (arr, k) => {
  k %= arr.length;
  reverse(arr, 0, arr.length - 1);
  reverse(arr, 0, k - 1);
  reverse(arr, k, arr.length - 1);
  return arr;
};

const reverse = (nums, start, end) => {
  while (start < end) {
    const temp = nums[start];
    nums[start] = nums[end];
    nums[end] = temp;
    start++;
    end--;
  }
};

console.log(rotate([1, 2, 3, 4, 5, 6, 7], 3));

function flatNestedArray(arr = [1, 2, 3, [4, 5, [6, 7]], 8, 9, [10]]) {
  const stack = [...arr];
  const result = [];

  while (stack.length) {
    const next = stack.pop();
    if (Array.isArray(next)) {
      stack.push(...next);
    } else {
      result.unshift(next);
    }
  }
  return result;
}
console.log(flatNestedArray());

function reverseArray(arr = [1, 2, 3, 4, 5]) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  return arr;
}
console.log(reverseArray());

function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let pivot = arr[0];
  let left = [];
  let right = [];
  let i = 1;
  while (i < arr.length) {
    if (pivot < arr[i]) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
    i++;
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}
console.log(quickSort([1, 20, 10, 12, 3]));

function maxProduct(arr) {
  const sortArray = quickSort(arr);
  return sortArray[0] * sortArray[1];
}

console.log(maxProduct([1, 10, 3, 4, 7])); // Output: 70

function isCorrectBracketPair(expression) {
  const stack = [];
  const matchingPair = {
    "(": ")",
    "{": "}",
    "[": "]",
  };
  let i = 0;
  while (i < expression.length) {
    const char = expression[i];
    if (matchingPair[char]) {
      stack.push(char);
    } else if (char === ")" || char === "}" || char === "]") {
      const lastOpened = stack.pop();
      if (matchingPair[lastOpened] !== char) {
        return false;
      }
    }
    i++;
  }
  console.log(stack);
  return stack.length === 0;
}
console.log(isCorrectBracketPair("({[]})"));

// Input  : Stack[] = [1, 2, 3, 4, 5]
// Output : Stack[] = [1, 2, 4, 5]

// Input  : Stack[] = [1, 2, 3, 4, 5, 6]
// Output : Stack[] = [1, 2, 4, 5, 6]

function deleteMid(arr) {
  const result = [];
  let i = 0;
  const midIndex = Math.floor(arr.length / 2);
  while (i < arr.length) {
    if (i === midIndex) {
      i++;
      continue;
    } else {
      result.push(arr[i]);
    }
    i++;
  }
  return result;
}
//without using extra space
function deleteMidWitOutExtraSpace(arr) {
  const midIndex = Math.floor(arr.length / 2);
  const tempStack = [];
  let i = 0;
  while (i < midIndex) {
    let next = arr.pop();
    tempStack.push(next);
    i++;
  }
  arr.pop();
  while (tempStack.length) {
    arr.push(tempStack.pop());
  }
  return arr;
}

console.log(deleteMid([1, 2, 3, 4, 5]));
console.log(deleteMidWitOutExtraSpace([1, 2, 3, 4, 5]));

//Reverse a stack without using extra space in O(n) [1,2,3,4,5] -> [5,4,3,2,1] // use linkedlist

class StackNode{
constructor(data){
  this.data=data
  this.next=null
}s
}
class Stack{
  top=null
  push(data){
    if(this.top===null){
      this.top=new StackNode(data)
      return
    }
    let stackNode=new StackNode(data)
    stackNode.next=this.top
    this.top=stackNode
  }
}

