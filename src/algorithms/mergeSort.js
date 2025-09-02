export function mergeSort(array) {
  let animations = [];
  let arr = [...array];
  mergeSortHelper(arr, 0, arr.length - 1, animations);
  return animations;
}

function mergeSortHelper(arr, left, right, animations) {
  if (left >= right) return;
  let mid = Math.floor((left + right) / 2);
  mergeSortHelper(arr, left, mid, animations);
  mergeSortHelper(arr, mid + 1, right, animations);
  merge(arr, left, mid, right, animations);
}

function merge(arr, left, mid, right, animations) {
  let temp = [];
  let i = left, j = mid + 1;

  while (i <= mid && j <= right) {
    animations.push(["compare", i, j]);
    if (arr[i] <= arr[j]) {
      temp.push(arr[i++]);
    } else {
      temp.push(arr[j++]);
    }
  }

  while (i <= mid) temp.push(arr[i++]);
  while (j <= right) temp.push(arr[j++]);

  for (let k = left; k <= right; k++) {
    animations.push(["overwrite", k, temp[k - left]]);
    arr[k] = temp[k - left];
  }
}
