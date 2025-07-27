function quickSort(arr, low, high) {
  if (low < high) {
    let partitionIndex = partition(arr, low, high);
    quickSort(arr, low, partitionIndex - 1);
    quickSort(arr, partitionIndex + 1, high);
  }
}

function partition(arr, low, high) {
  let i = low;
  let j = high;
  let pivot = arr[low];
  while (i < j) {
    while (arr[i] <= pivot && i < high) {
      i++;
    }
    while (arr[j] > pivot && j > low) {
      j--;
    }
    if (i < j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[low], arr[j]] = [arr[j], arr[low]];
  return j;
}
const arr = [5, 1, 2, 3, 4];
quickSort(arr, 0, arr.length - 1);
console.log(arr); // Output: [1, 2, 3, 4, 5] TC: O(nlogn) SC: O(logn)
