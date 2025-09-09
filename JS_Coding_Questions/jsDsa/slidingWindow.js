// length of longest substring without repeating characters
// length Of Longest Substring of TwoDistinct
//187. Repeated DNA Sequences

function lengthOfLongestSubstring(s) {
  let right = 0;
  let left = 0;
  const set = new Set();
  let maxLength = 0;
  while (right < s.length) {
    let letter = s[right];
    if (!set.has(letter)) {
      set.add(letter);
      maxLength = Math.max(maxLength, set.size);
      right++;
    } else {
      set.delete(s[left]);
      left++;
    }
  }
  return maxLength;
}
console.log(lengthOfLongestSubstring("abcdeabc"), "engthOfLongestSubstring");

function lengthOfLongestSubstringTwoDistinct(s) {
  let right = 0;
  let left = 0;
  let max = 0;
  const map = new Map();
  while (right < s.length) {
    map.set(s[right], (map.get(s[right]) || 0) + 1);
    while (map.size > 2) {
      map.set(s[left], map.get(s[left]) - 1);
      if (map.get(s[left]) === 0) {
        map.delete(s[left]);
      }
      left++;
    }
    max = Math.max(max, right - left + 1);
    right++;
  }
  return max;
}

console.log(
  lengthOfLongestSubstringTwoDistinct("ccabcabc"),
  "lengthOfLongestSubstringTwoDistinct"
);

//187. Repeated DNA Sequences
//Input: s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"
// Output: ["AAAAACCCCC","CCCCCAAAAA"]
// Example 2:

// Input: s = "AAAAAAAAAAAAA"
// Output: ["AAAAAAAAAA"]

function repeatedDNASequences(s) {
  const seen = new Set();
  const repeated = new Set();
  //   for (let i = 0; i < s.length - 10; i++) {
  //     if (seen.has(s.slice(i, i + 10))) {
  //       repeated.add(s.slice(i, i + 10));
  //     } else {
  //       seen.add(s.slice(i, i + 10));
  //     }
  //   }
  let left = 0,
    right = 10;
  while (right < s.length) {
    const sub = s.slice(left, right);
    if (seen.has(sub)) {
      repeated.add(sub);
    } else {
      seen.add(sub);
    }
    right++;
    left++;
  }
  // console.log(seen, "seen", repeated);
  return [...repeated];
}

console.log(repeatedDNASequences("AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"));

//209. Minimum Size Subarray Sum
// Input: target = 7, nums = [2,3,1,2,4,3]
// Output: 2

function minimumSizeOfSubArray(target, nums) {
  let left = 0,
    right = 0;
  let min = Infinity;
  let sum = 0;
  while (right < nums.length) {
    sum += nums[right];
    while (sum >= target) {
      min = Math.min(min, right - left + 1);
      sum -= nums[left];
      left++;
    }
    right++;
  }
  return min === Infinity ? 0 : min;
}
console.log(minimumSizeOfSubArray(10, [2, 3, 1, 2, 4, 3]));

//containsNearbyDuplicate
// Example 1:
// Input: nums = [1,2,3,1], k = 3
// Output: true
// Example 2:
// Input: nums = [1,0,1,1], k = 1
// Output: true
// Example 3:
// Input: nums = [1,2,3,1,2,3], k = 2
// Output: false

function containsNearbyDuplicate(nums, k) {
  const set = new Set();
  for (let i = 0; i < nums.length; i++) {
    if (set.has(nums[i])) return true;
    set.add(nums[i]);
    if (set.size > k) set.delete(nums[i - k]);
  }
  return false;
}
console.log(containsNearbyDuplicate([1, 2, 3, 1], 3));
console.log(containsNearbyDuplicate([1, 0, 1, 1], 1));
console.log(containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2));

//count good substrings
// Input: s = "xyzzaz"
// Output: 1

function goodSubString(s = "") {
  let i = 0,
    j = 0,
    count = 0;
  const arr = new Array(26).fill(0);
  while (j < s.length) {
    arr[s.charCodeAt(j) - 97]++;
    const range = j - i + 1;
    if (range === 3) {
      if (isGoodStr(arr)) {
        console.log("enting__");
        count++;
      }
      arr[s.charCodeAt(i) - 97]--;
      i++;
    }
    j++;
  }
  return count;
}
function isGoodStr(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 1) return false;
  }
  return true;
}
console.log(goodSubString("xyzzaz"), "goodSubString");

function minimumSizeSubArraySum(nums, target) {
  let i = 0,
    j = 0,
    min = Infinity,
    sum = 0;

  while (j < nums.length) {
    sum += nums[j];

    while (sum >= target) {
      min = Math.min(min, j - i + 1);
      sum -= nums[i];
      i++;
    }
    j++;
  }
  return min === Infinity ? 0 : min;
}
console.log(
  minimumSizeSubArraySum([1, 7, 3, 5, 4, 6], 10),
  "minsizeOf SubArray"
);
