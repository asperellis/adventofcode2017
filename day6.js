const input = document.body.innerText.trim().split('\t').map(Number);

const memoryReallocation = (arr) => {
  // used to track all the prev reallocations
  const previousStates = {};
  
  // tracks the steps taken
  let steps = 0;

  // takes an array, index to start at and an amount to redist across the array starting at the next index after start
  const reallocate = (a, i, m) => {
    for(let k = i + 1; m > 0; k++) {
      // restart at index 0 if past array bounds
      if (k >= a.length - 1) {
        k = k % a.length;
      }
      // increase by one
      a[k] = a[k] + 1;
      // subtract from the memory being allocated
      m--;
    }
    // return the changed array
    return a;
  };

  // while there isnt a record of the current array state
  while(!previousStates[arr.join('-')]) {
    // get the index with the largest value, auto takes the first if tied
    const indexWithLargestVal = arr.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
    
    // memory to allocate
    const memory = arr[indexWithLargestVal];
    
    // step tracker
    steps++;
    
    // log current array state with steps to calculate cycles within infinite loop
    previousStates[arr.join('-')] = steps;
    
    // reset largest index value
    arr[indexWithLargestVal] = 0;
    
    // reallocate memory
    arr = reallocate(arr, indexWithLargestVal, memory);
  }

  // return two values - cycles = steps taken until first repeated array is found | cyclesInLoop = steps between these two repeated arrays
  return { 
    cycles: Object.keys(previousStates).length,
    cyclesInLoop: steps + 1 - previousStates[arr.join('-')]
  };
};

// part 1
console.log(memoryReallocation(input).cycles);

// part 2
console.log(memoryReallocation(input).cyclesInLoop);