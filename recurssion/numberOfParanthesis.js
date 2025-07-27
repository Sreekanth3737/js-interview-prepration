//Question numberOfParanthesis
// Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
// For example, given n = 3, a solution set is:
// [
//   "((()))",
//   "(()())",
//   "(())()",
//   "()(())",
//   "()()()"
// ]
//
// Constraints:
// 1 <= n <= 8
// 0 <= n <= 8
//
// Approach:
// 1. Use backtracking to generate all combinations of parentheses.
// 2. Use a helper function to keep track of the current combination of parentheses.
// 3. Use two variables to keep track of the number of open and close parentheses used.
// 4. If the number of open parentheses is less than n, add an open parenthesis and call the helper function recursively.
// 5. If the number of close parentheses is less than the number of open parentheses, add a close parenthesis and call the helper function recursively.
// 6. If the current combination of parentheses is valid, add it to the result array.
// 7. Return the result array.

function genrateValidParanthesis(n) {
  const sol = [];
  const ans = [];

  function backtrack(open = 0, close = 0) {
    if (sol.length === 2 * n) {
      ans.push(sol.join(""));
      return;
    }
    if (open < n) {
      sol.push("(");
      backtrack(open + 1, close);
      sol.pop();
    }
    if (close < open) {
      sol.push(")");
      backtrack(open, close + 1);
      sol.pop();
    }
  }
  backtrack(0, 0);
  return ans;
}
const n = 3;
const result = genrateValidParanthesis(n);
console.log(result); // Output: ["((()))","(()())","(())()","()(())","()()()"]
// Time Complexity: O(4^n / sqrt(n)) - Catalan number
// Space Complexity: O(n) - for the recursion stack
