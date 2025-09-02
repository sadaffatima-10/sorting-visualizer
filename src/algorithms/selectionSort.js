export function selectionSort(array) {
  let animations = [];
  let arr = [...array];

  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      animations.push(["compare", minIndex, j]);
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      animations.push(["swap", i, minIndex]);
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return animations;
}
