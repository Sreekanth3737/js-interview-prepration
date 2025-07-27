function printNumbers(n) {
  if (n <= 0) {
    return [];
  }
  const result = printNumbers(n - 1);
  result.push(n);
  return result;
}
console.log(printNumbers(5).join(", ")); // Output: 1, 2, 3, 4, 5

// N factorial
function factorial(n) {
  if (n == 0) {
    return 1;
  }
  return n * factorial(n - 1);
}
console.log(factorial(5)); // 120

// Sum of N numbers
function sum(n) {
  if (n === 1) {
    return 1;
  }
  return n + sum(n - 1);
}
console.log(sum(5));

// nth fibonacci number in for loop
function fibonacci(n) {
  let a = 0;
  let b = 1;
  let c = 0;
  for (let i = 2; i <= n; i++) {
    c = a + b;
    a = b;
    b = c;
  }
  return c;
}
console.log(fibonacci(6)); // Output: 8
// nth fibonacci number in memoization
function fibonacciMemoization(n, memo = {}) {
  if (n <= 1) {
    return n;
  }
  if (memo[n]) {
    return memo[n];
  }
  memo[n] =
    fibonacciMemoization(n - 1, memo) + fibonacciMemoization(n - 2, memo);
  return memo[n];
}
console.log(fibonacciMemoization(6)); // Output: 8
// nth fibonacci number in recursion
function fibonacciRecursion(n) {
  if (n <= 1) {
    return n;
  }
  return fibonacciRecursion(n - 1) + fibonacciRecursion(n - 2);
}
console.log(fibonacciRecursion(5)); // Output: 5

// print the name n Times
function printName(i, n) {
  if (i > n) {
    return;
  }
  console.log("John Doe");
  printName(i + 1, n);
}
console.log(printName(1, 5)); // Output: John Doe John Doe John Doe John Doe John Doe

function printNum(i, n) {
  if (i > n) {
    return;
  }
  console.log(i);
  printNum(i + 1, n);
}
console.log(printNum(1, 5)); // Output: 1 2 3 4 5

function printNumReverse(i, n) {
  if (i < 1) {
    return;
  }
  console.log(i);
  printNumReverse(i - 1, n);
}
console.log(printNumReverse(5, 5)); // Output: 5 4 3 2 1

function printAllSubsequence(index, arr, result = []) {
  if (index >= arr.length) {
    if (result.length === 0) {
      console.log("[]");
    }
    console.log(result.join(","));
    return;
  }
  result.push(arr[index]);
  printAllSubsequence(index + 1, arr, result);
  result.pop();
  printAllSubsequence(index + 1, arr, result);
}
printAllSubsequence(0, [3, 1, 2]);

function sumOfKSubsequence(index, arr, result = [], sum, target) {
  if (index == arr.length) {
    if (sum == target) {
      console.log(result);
    }
    return;
  }
  result.push(arr[index]);
  sum += arr[index];
  sumOfKSubsequence(index + 1, arr, result, sum, target);
  result.pop();
  sum -= arr[index];
  sumOfKSubsequence(index + 1, arr, result, sum, target);
}
sumOfKSubsequence(0, [1, 2, 1], [], 0, 2);

function printFirstSubsequenceSumK(index, arr, result, sum, target) {
  if (index == arr.length) {
    if (sum === target) {
      console.log(result);
      return true;
    } else {
      return false;
    }
  }
  result.push(arr[index]);
  sum += arr[index];
  if (printFirstSubsequenceSumK(index + 1, arr, result, sum, target) == true) {
    return true;
  }
  result.pop();
  sum -= arr[index];
  if (printFirstSubsequenceSumK(index + 1, arr, result, sum, target) == true) {
    return true;
  }
  return false;
}

printFirstSubsequenceSumK(0, [1, 2, 1], [], 0, 2);

// refactored sum of k subsequence
function sumOfKSubsequenceRefactored(index, arr, sum, target) {
  if (sum > target) return 0;
  if (index == arr.length) {
    if (sum === target) {
      return 1;
    } else {
      return 0;
    }
  }
  sum += arr[index];
  let left = sumOfKSubsequenceRefactored(index + 1, arr, sum, target);
  sum -= arr[index];
  let right = sumOfKSubsequenceRefactored(index + 1, arr, sum, target);
  return left + right;
}
console.log(sumOfKSubsequenceRefactored(0, [1, 2, 1], 0, 2));

// Power Set
function powerSet(index, arr, result = [], allSubsets = []) {
  if (index === arr.length) {
    allSubsets.push([...result]);
    return;
  }
  result.push(arr[index]);
  powerSet(index + 1, arr, result, allSubsets); // Include
  result.pop();
  powerSet(index + 1, arr, result, allSubsets); // Exclude
  return allSubsets;
}

const subsets = powerSet(0, [1, 2, 3]);
console.log(subsets);
