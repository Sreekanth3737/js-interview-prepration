//  Problem 1: Arrays (Easy – Core Logic)
// "Given an array of integers, return the indices of the two numbers that add up to a target."

// Example:

// js
// Copy
// Edit
// Input: [2, 7, 11, 15], target = 9
// Output: [0, 1]  // because 2 + 7 = 9
// 🧠 Constraints:

// Use a hash map for O(n) time complexity.

// Return any one pair of indices.

const twoSum = (arr, target) => {
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    const complement = target - arr[i];

    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(arr[i], i);
  }
  return null;
};
console.log(twoSum([2, 7, 11, 15], 9));

//  Question:
// Given two strings s and t, return true if t is an anagram of s, and false otherwise.

// 📘 An anagram is a word or phrase formed by rearranging the letters of another.

// ✅ Example:
// js
// Copy
// Edit
// Input: s = "listen", t = "silent"
// Output: true

// Input: s = "hello", t = "olelh"
// Output: true

// Input: s = "rat", t = "car"
// Output: false
// ⛔ Constraints:
// Ignore spaces and case sensitivity (optional bonus)

// Must have O(n) time complexity

const isAnagram = (s, t) => {
  if (s.length !== t.length) return false;
  const countMap = new Map();
  for (let char of s) {
    char = char.toLowerCase();
    countMap.set(char, (countMap.get(char) || 0) + 1);
  }
  for (let char of t) {
    char = char.toLowerCase();
    if (!countMap.has(char) || countMap.get(char) === 0) return false;
    countMap.set(char, countMap.get(char) - 1);
  }
  return true;
};
console.log(isAnagram("listen", "silent")); // true
console.log(isAnagram("hello", "olelh")); // true
console.log(isAnagram("rat", "car")); // false

// Problem:
// Given an array of integers, return the first non-repeating element.
// If none exist, return null.

// ✅ Example:
// js
// Copy
// Edit
// Input: [2, 3, 4, 2, 3, 5, 4]
// Output: 5

// Input: [1, 1, 2, 2]
// Output: null
// 🎯 Time complexity goal: O(n)

const firstNonRepeating = (arr) => {
  const map = new Map();
  for (let n of arr) {
    map.set(n, (map.get(n) || 0) + 1);
  }
  for (let n of arr) {
    if (map.get(n) === 1) {
      return n;
    }
  }
  return null;
};
console.log(firstNonRepeating([2, 3, 4, 2, 3, 5, 4])); // Output: 5
console.log(firstNonRepeating([1, 1, 2, 2]));

//  Ready for Question 2?
// 🔡 Question 2: String – Reverse Words in a Sentence
// 🧠 Problem:
// Write a function that reverses the words in a sentence.

// Do not reverse the characters inside the word — only the word order.

// ✅ Example:
// js
// Copy
// Edit
// Input: "hello world this is react"
// Output: "react is this world hello"

const reverseWords = (sentance) => {
  const words = sentance.split(" ");
  for (let i = 0; i < Math.floor(words.length / 2); i++) {
    let temp = words[i];
    words[i] = words[words.length - 1 - i];
    words[words.length - 1 - i] = temp;
  }
  return words.join(" ");
};
console.log(reverseWords("hello world this is react")); // Output: "react is this world hello"

//"Find all duplicates in an array and return them in a new array."

function findDuplicates(arr) {
  const seen = new Set();
  const res = [];
  for (let i of arr) {
    if (seen.has(i)) {
      res.push(i);
    } else {
      seen.add(i);
    }
  }
  return res;
}
console.log(findDuplicates([1, 2, 3, 4, 5, 1, 2])); // Output: [1, 2]

//"Find the length of the longest substring without repeating characters. by sliding window technique."

function lengthOfLongestSubstring(s) {
  const charSet = new Set();
  let left = 0;
  let maxLength = 0;
  let right = 0;
  // for (let right = 0; right < s.length; right++) {
  //   while (charSet.has(s[right])) {
  //     charSet.delete(s[left]);
  //     left++;
  //   }
  //   charSet.add(s[right]);
  //   maxLength = Math.max(maxLength, right - left + 1);
  // }
  while (right < s.length) {
    if (!charSet.has(s[right])) {
      charSet.add(s[right]);
      maxLength = Math.max(maxLength, charSet.size);
      right++;
    } else {
      charSet.delete(s[left]);
      left++;
    }
  }
  return maxLength;
}
console.log(
  lengthOfLongestSubstring("abcabcbb"),
  "length of longest substring"
); // Output: 3 (substring "abc")

//Question 6: Two pointers — "Merge two sorted arrays into one sorted array (no sort function allowed)"
function mergeTwoSortedArrays(arr1, arr2) {
  const merged = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      merged.push(arr1[i]);
      i++;
    } else {
      merged.push(arr2[j]);
      j++;
    }
  }

  while (i < arr1.length) {
    merged.push(arr1[i]);
    i++;
  }

  while (j < arr2.length) {
    merged.push(arr2[j]);
    j++;
  }

  return merged;
}
console.log(mergeTwoSortedArrays([1, 3, 5], [2, 4, 6]), "merge two arrays"); // Output: [1, 2, 3,

function lengthOfLongestSubstringTwoDistinct(s) {
  let right = 0;
  let left = 0;
  const charMap = new Map();
  let maxLength = 0;
  while (right < s.length) {
    charMap.set(s[right], (charMap.get(s[right]) || 0) + 1);

    while (charMap.size > 2) {
      charMap.set(s[left], charMap.get(s[left]) - 1);
      if (charMap.get(s[left]) === 0) {
        charMap.delete(s[left]);
      }
      left++;
    }
    maxLength = Math.max(maxLength, right - left + 1);
    right++;
  }
  return maxLength;
}

console.log(
  lengthOfLongestSubstringTwoDistinct("ccabcabc"),
  "length of longest substring with two distinct characters"
); // Output: 3 (substring "cca")
