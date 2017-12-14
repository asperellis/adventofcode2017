const fs = require('fs');
const knotHash = require('./utils/knot-hash');
const padLeft = s => '0000'.substring(0, 4 - s.length) + s;
const makeBinary = str => str.split('').map((c) => padLeft(parseInt(c, 16).toString(2))).join('');
const input = 'jxqlasbh';

// takes disk name and size and returns used spaces
const buildGrid = (disk, size) => {
  // counter
  let usedSpace = 0;
  let grid = [];

  for(let i = 0; i < size; i++) {
    // binary string of a knot hash
    const hashBinary = makeBinary(knotHash(input + '-' + i, 64));
    usedSpace += hashBinary.match(/1/g) ? hashBinary.match(/1/g).length : 0;
    grid[i] = hashBinary.split('').map(Number);
  }

  return {
    contents: grid,
    usedSpace
  };
};

const gridRegions = (grid) => {
  let regions = 0;
  const visited = {};

  // given a coordinate, validate if its good to check
  const isValidNode = ([x, y]) => {
    // x and y have to be within the arrays and !0
    const onGridAndNotZero = x >= 0 && y >= 0 && x >= 0 && (x <= grid[0].length - 1) && (y <= grid.length - 1) && grid[y][x];

    // return true if on grid and havent already visited it
    return onGridAndNotZero && !visited[`${x},${y}`];
  };

  // get a region and build it out with its adjacents if any
  // used reddit for help on this one. notes lead this way but wasn't sure how to proceed
  const getRegion = (x, y) => {
    if(!isValidNode([x, y])) {
      return;
    }
    
    regions++;

    const nodesQueue = [[x, y]]
    while (nodesQueue.length) {
      const [x, y] = nodesQueue.shift()
      visited[`${x},${y}`] = true
      const adjacentNodes = [
        [x - 1, y], [x + 1, y], [x, y + 1], [x, y - 1]
      ].filter(isValidNode)
      nodesQueue.push.apply(nodesQueue, adjacentNodes)
    }
  };

  // for each grid row
  for(let y = 0; y < grid.length; y++) {
    // for each index in a grid row
    for(let x = 0; x < grid[y].length; x++) {
      // run the region checker
      getRegion(x, y);
    }
  }

  return regions;
};

const grid = buildGrid(input, 128);

// part 1
console.log('USED SPACE ', grid.usedSpace);

// part 2
console.log('REGIONS ', gridRegions(grid.contents));