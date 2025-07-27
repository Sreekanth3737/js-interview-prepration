function mergeSort(arr, low, high) {
  if (low >= high) return;
  let mid = Math.floor((low + high) / 2);
  mergeSort(arr, low, mid);
  mergeSort(arr, mid + 1, high);
  merge(arr, low, mid, high);
}
function merge(arr, low, mid, high) {
  let i = low;
  let j = mid + 1;
  const tempArr = [];
  while (i <= mid && j <= high) {
    if (arr[i] <= arr[j]) {
      tempArr.push(arr[i]);
      i++;
    } else {
      tempArr.push(arr[j]);
      j++;
    }
  }
  while (i <= mid) {
    tempArr.push(arr[i]);
    i++;
  }
  while (j <= high) {
    tempArr.push(arr[j]);
    j++;
  }
  for (let i = low; i <= high; i++) {
    arr[i] = tempArr[i - low];
  }
}
const inputArr = [5, 1, 2, 3, 4];
mergeSort(inputArr, 0, 4);
console.log(inputArr); // TC: O(nlogn) SC: O(n)
