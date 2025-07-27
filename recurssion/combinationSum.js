// combination Sum 1
function combinationSum(index, arr, target, ans, ds) {
  if (index === arr.length) {
    if (target === 0) {
      ans.push([...ds]);
    }
    return;
  }
  if (arr[index] <= target) {
    ds.push(arr[index]);
    combinationSum(index, arr, target - arr[index], ans, ds);
    ds.pop();
  }
  combinationSum(index + 1, arr, target, ans, ds);
}
const ans = [];
const ds = [];
combinationSum(0, [2, 3, 6, 7], 7, ans, ds);
console.log(ans, "Combination Sum");

function combinationSumII(index, arr, target, ans, ds) {
  if (target === 0) {
    ans.push([...ds]);
    return;
  }
  //   if (index === arr.length) {
  //     return;
  //   }
  for (let i = index; i < arr.length; i++) {
    if (i > index && arr[i] === arr[i - 1]) continue;
    if (arr[i] > target) break;
    ds.push(arr[i]);
    combinationSumII(i + 1, arr, target - arr[i], ans, ds);
    ds.pop();
  }
}
const ans2 = [];
const ds2 = [];
combinationSumII(0, [1, 1, 1, 2, 2], 4, ans2, ds2);
console.log(ans2, "Combination Sum II");
