import React, { useState, useEffect } from "react";
import "../styles/SortingVisualizer.css";

export default function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [algorithm, setAlgorithm] = useState("bubbleSort");
  const [isSorting, setIsSorting] = useState(false);
  const [numBars, setNumBars] = useState(20); // default 20 bars


  // generate new array
  const generateArray = (size = 30) => {
    const newArr = Array.from({ length: size }, () =>
      Math.floor(Math.random() * 200) + 20
    );
    setArray(newArr);
  };

  <div className="controls">
  <button onClick={generateArray}>Generate New Array</button>

  <label>
    Number of Bars: 
    <input
      type="range"
      min="5"
      max="100"
      value={numBars}
      onChange={(e) => setNumBars(Number(e.target.value))}
    />
    <span>{numBars}</span>
  </label>
</div>


  useEffect(() => {
    generateArray();
  }, []);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


  const bubbleSort = async () => {
    let arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await delay(50);
        }
      }
    }
  };

  const selectionSort = async () => {
    let arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      let minIdx = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIdx]) minIdx = j;
      }
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      setArray([...arr]);
      await delay(100);
    }
  };

  const insertionSort = async () => {
    let arr = [...array];
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
        setArray([...arr]);
        await delay(100);
      }
      arr[j + 1] = key;
      setArray([...arr]);
      await delay(100);
    }
  };

  const mergeSortHelper = async (arr, l, r) => {
    if (l >= r) return;
    const mid = Math.floor((l + r) / 2);
    await mergeSortHelper(arr, l, mid);
    await mergeSortHelper(arr, mid + 1, r);
    await merge(arr, l, mid, r);
  };

  const merge = async (arr, l, m, r) => {
    let left = arr.slice(l, m + 1);
    let right = arr.slice(m + 1, r + 1);
    let i = 0,
      j = 0,
      k = l;
    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        arr[k++] = left[i++];
      } else {
        arr[k++] = right[j++];
      }
      setArray([...arr]);
      await delay(80);
    }
    while (i < left.length) {
      arr[k++] = left[i++];
      setArray([...arr]);
      await delay(80);
    }
    while (j < right.length) {
      arr[k++] = right[j++];
      setArray([...arr]);
      await delay(80);
    }
  };

  const mergeSort = async () => {
    let arr = [...array];
    await mergeSortHelper(arr, 0, arr.length - 1);
    setArray([...arr]);
  };

  const quickSortHelper = async (arr, low, high) => {
    if (low < high) {
      let pi = await partition(arr, low, high);
      await quickSortHelper(arr, low, pi - 1);
      await quickSortHelper(arr, pi + 1, high);
    }
  };

  const partition = async (arr, low, high) => {
    let pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        await delay(80);
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    await delay(80);
    return i + 1;
  };

  const quickSort = async () => {
    let arr = [...array];
    await quickSortHelper(arr, 0, arr.length - 1);
    setArray([...arr]);
  };

  // run selected algorithm
  const startSorting = async () => {
    setIsSorting(true);
    if (algorithm === "bubbleSort") await bubbleSort();
    else if (algorithm === "selectionSort") await selectionSort();
    else if (algorithm === "insertionSort") await insertionSort();
    else if (algorithm === "mergeSort") await mergeSort();
    else if (algorithm === "quickSort") await quickSort();
    setIsSorting(false);
  };

  return (
    <div className="visualizer-container">
      <h1>Sorting Visualizer</h1>
      <div className="controls">
        <button onClick={() => generateArray()} disabled={isSorting}>
          Generate New Array
        </button>
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          disabled={isSorting}
        >
          <option value="bubbleSort">Bubble Sort</option>
          <option value="selectionSort">Selection Sort</option>
          <option value="insertionSort">Insertion Sort</option>
          <option value="mergeSort">Merge Sort</option>
          <option value="quickSort">Quick Sort</option>
        </select>
        <button onClick={startSorting} disabled={isSorting}>
          Start Sorting
        </button>
      </div>
      <div className="bars-container">
        {array.map((val, idx) => (
          <div
            className="bar"
            key={idx}
            style={{
              height: `${val}px`,
              width: `${600 / numBars}px`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
