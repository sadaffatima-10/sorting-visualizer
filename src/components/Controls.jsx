import React from "react";

export default function Controls({
  resetArray,
  startSort,
  pauseSort,
  isSorting,
  algorithm,
  setAlgorithm,
  speed,
  setSpeed,
}) {
  return (
    <div className="flex space-x-4 mt-6 items-center">
      <button
        onClick={resetArray}
        disabled={isSorting}
        className="px-4 py-2 bg-gray-600 text-white rounded"
      >
        Reset
      </button>

      <button
        onClick={startSort}
        disabled={isSorting}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Start
      </button>

      <button
        onClick={pauseSort}
        disabled={!isSorting}
        className="px-4 py-2 bg-yellow-600 text-white rounded"
      >
        Pause
      </button>

      <select
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value)}
        disabled={isSorting}
        className="px-2 py-1 border rounded"
      >
        <option>Bubble Sort</option>
        <option>Selection Sort</option>
        <option>Insertion Sort</option>
        <option>Merge Sort</option>
        <option>Quick Sort</option>
      </select>

      <label className="flex items-center text-sm">
        Speed:
        <input
          type="range"
          min="10"
          max="500"
          step="10"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="ml-2"
        />
      </label>
    </div>
  );
}
