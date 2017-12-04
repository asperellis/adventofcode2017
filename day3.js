const gridNumber = 361527;

// from math on Manhattan Disctance Equation
const calcDistance = (coord1, coord2) => {
  return Math.abs(coord1.x - coord2.x) + Math.abs(coord1.y - coord2.y);
};

// Part 1 Math From Outside Sources to get the coordinate location of a given int on a spiral grid. Added for note taking
const getGridCoordinates = (n) => {
  const k = Math.ceil((Math.sqrt(n) - 1) / 2);
  let t = 2 * k + 1;
  let m = Math.pow(t, 2);

  t -= 1;

  if (n >= m - t) {
    return {
      x: k - (m - n),
      y: -k
    };
  }

  m -= t;

  if (n >= m - t) {
    return {
      x: -k,
      y: -k + (m - n)
    };
  }

  m -= t;

  if (n >= m - t) {
    return {
      x: -k + (m - n),
      y: k
    };
  }

  return {
    x: k,
    y: k - (m - n - t)
  };
}

// Part 2 Solution From Outside Sources - Added for note taking - user built the actual grid
const findValueAfter = (n) => {
  let x = 0;
  let y = 0;
  let matrix = {};
  matrix[x + ',' + y] = 1;

  while(true) {
      const val = getValue(matrix, x, y);
      if (val >= n) {
          return val;
          break;
      }

      matrix[x + ',' + y] = val;

      if ((x !== y || x >= 0) && Math.abs(x) <= Math.abs(y)) {
          x += y >= 0 ? 1 : -1;
      } else {
          y += x >= 0 ? -1 : 1;
      }
  }
};

const getValue = (matrix, posX, posY) => {
  let sum = 0;
  for (let x = posX - 1; x <= posX + 1; x++) {
      for(let y = posY - 1; y <= posY + 1; y++) {
          if (matrix[x + ',' + y]) {
              sum += matrix[x + ',' + y];
          }
      }
  }
  return sum;
}

// Answers
console.log(calcDistance({ x: 0, y: 0 }, getGridCoordinates(361527)));
console.log(findValueAfter(361527));