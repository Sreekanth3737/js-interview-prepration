function printNumReverseInBacktraking(i, n) {
  if (i > n) {
    return;
  }

  printNumReverseInBacktraking(i + 1, n);
  console.log(i);
}
console.log(printNumReverseInBacktraking(1, 3));

function sum(i) {
  if (i === 0) {
    return 0;
  }
  return i + sum(i - 1);
}
console.log(sum(5)); // Output: 15

function fact(n) {
  if (n == 0) return 1;
  return n * fact(n - 1);
}
console.log(fact(5)); // Output: 120
function factPaameterized(n, ans = 1) {
  if (n == 0) return ans;
  return factPaameterized(n - 1, ans * n);
}
console.log(factPaameterized(5)); // Output: 120

function reverseArray(i, arr, n) {
  if (i >= n / 2) return;
  let temp = arr[i];
  arr[i] = arr[n - i - 1];
  arr[n - i - 1] = temp;
  reverseArray(i + 1, arr, n);
}
const revArr = [1, 2, 3, 4, 5];
reverseArray(0, revArr, 5);
console.log(revArr);

function palindrome(str) {
  for (let i = 0; i < str.length / 2; i++) {
    if (str[i] !== str[str.length - i - 1]) {
      return false;
    }
  }
  return true;
}
console.log(palindrome("madam")); // Output: true
console.log(palindrome("hello")); // Output: false

function palindromeByRecursion(str, i) {
  if (i >= str.length / 2) {
    return true;
  }
  if (str[i] !== str[str.length - i - 1]) return false;
  return palindromeByRecursion(str, i + 1);
}
console.log(palindromeByRecursion("madam", 0)); // Output: true
