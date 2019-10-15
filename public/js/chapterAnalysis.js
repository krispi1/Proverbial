"use strict"; // enforce strict mode for error checking

/**
 * gksiele
 * sielekrisp@gmail.com
 * https://www.github.com/krispi1
 * 
 * **NOTHING BEATS EXPERIENCE**
**/

const allChapters = [
  33, 22, 35, 27, 23, 35,
  27, 36, 18, 32, 31, 28,
  25, 35, 33, 33, 28, 24,
  29, 30, 31, 29, 35, 34,
  28, 28, 27, 28, 27, 33, 31
];

// order array elements in ascending order
function orderAllChapters(inputArray) {
  return inputArray.sort((a, b) => a - b);
};

//console.log(orderAllChapters(allChapters));