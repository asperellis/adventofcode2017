const fs = require('fs');

fs.readFile('inputs/day10.txt', 'utf8', (err, data) => {
  // make a str an ascii code
  const makeAscii = (str) => {
    return str.charCodeAt(0);
  };

  // for part 2
  const dataAsAscii = data.trim().split('').map(makeAscii);
  dataAsAscii.push(17, 31, 73, 47, 23);

  // knot hash, takes array of ints and optional repititions param to specify how many times to run initial hashing
  const knotHash = (input, repititions) => {
    const list = [...Array(256).keys()];
    // current position
    let currentPos = 0;
    let skipSize = 0;
    // puzzle input
    let inputLengths = input;

    // make dense hash - for every 16 indexes in array - reduce to a XOR bitwise
    const makeDenseHash = (arr) => {
      const dense = [];
      for(let i = 0; i < arr.length; i+=16) {
        dense.push(arr.slice(i, i + 16).reduce((a, b) => a ^ b, 0));
      }
      return dense;
    };

    // take each XOR / bitwise value and make it a 2 char hex character
    const makeHexHash = (arr) => {
      return arr.reduce((a, b) => {
        let hex = b.toString(16);
        if(hex.length < 2) {
          hex = '0' + hex;
        }
        return a += hex;
      }, '');
    }

    // function to run one hash
    const runHash = () => {
      inputLengths.forEach((length, indx) => {
        // select the indexes in the list from currentPos to inputLength and reverse them
        // going beyond the list lenght results in wrapping back to start index
        let selectedReversed = [];
        if(currentPos + length > list.length) {
          selectedReversed = [...list.slice(currentPos, list.length), ...list.slice(0, length - 1 - (list.length - 1 - currentPos))].reverse();
        } else {
          selectedReversed = list.slice(currentPos, currentPos + length).reverse();
        }

        // update the indexes
        for(let i = currentPos; i < currentPos + length; i++) {
          const update = selectedReversed.shift();
          const index = i >= list.length ? i % list.length : i;
          list[index] = update;
        }

        // inc currentPos forward by length plus skip size (currentPos += length + skipSize)
        currentPos += length + skipSize;
        // wrap currentPos around if past list length
        if(currentPos > list.length) {
          currentPos = currentPos % list.length;
        }
        // inc skipSize by 1
        skipSize++;
      });
    };

    if(!repititions) {
      // do once if no repititions declared
      runHash();
      return list[0] * list[1];
    }

    // hash numerous times based on repititions parameter
    for (let i = 0; i < repititions; i++) {
      runHash();
    }
    
    // take the resulting list and make a dense hash then hex hash from the dense. always returns 32 char string if correct
    return makeHexHash(makeDenseHash(list));
  };

  // part 1
  console.log(knotHash(data.split(',').map(Number)));
  
  // part 2
  console.log(knotHash(dataAsAscii, 64));
});