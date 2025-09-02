export function quickSort(array) {
  let animations = [];
  let arr = [...array];
  quickSortHelper(arr, 0, arr.length - 1, animations);
  return animations;
}

function quickSortHelper(arr, low, high, animations) {
  if (low < high) {
    let pivotIndex = partition(arr, low, high, animations);
    quickSortHelper(arr, low, pivotIndex - 1, animations);
    quickSortHelper(arr, pivotIndex + 1, high, animations);
  }
}

function partition(arr, low, high, animations) {
  let pivot = arr[high];
  let i = low;

  for (let j = low; j < high; j++) {
    animations.push(["compare", j, high]);
    if (arr[j] < pivot) {
      animations.push(["swap", i, j]);
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }
  animations.push(["swap", i, high]);
  [arr[i], arr[high]] = [arr[high], arr[i]];
  return i;
}
