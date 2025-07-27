// Question: Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. A mapping of digit to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.
//
// Example:
// Input: digits = "23"
// Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
// Input: digits = ""
// Output: []
// Input: digits = "2"
// Output: ["a","b","c"]
// Note: The order of output does not matter.
//
// Constraints:
// 0 <= digits.length <= 4
function combinationOfLetters(str) {
  if (str.length === 0) return [];
  const ans = [];
  const sol = [];
  const letterMap = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };

  function backtrack(index = 0) {
    if (index === str.length) {
      ans.push(sol.join(""));
      return;
    }
    const letters = letterMap[str[index]];
    for (let i = 0; i < letters.length; i++) {
      sol.push(letters[i]);
      backtrack(index + 1);
      sol.pop();
    }
  }
  backtrack(0);
  return ans;
}
const str = "23";
const result = combinationOfLetters(str);
console.log(result); // Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
