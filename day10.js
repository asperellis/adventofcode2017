const fs = require('fs');

fs.readFile('inputs/day10.txt', 'utf8', (err, data) => {
  const makeAscii = (str) => {
    return str.charCodeAt(0);
  };

  const knotHash = (input, repititions) => {
    // list 0-255
    const list = [...Array(256).keys()];
    // current position
    let currentPos = 0;
    let skipSize = 0;
    // puzzle input
    let inputLengths = input;
    const makeDenseHash = (arr) => {
      const dense = [];
      for(let i = 0; i < arr.length; i+=16) {
        dense.push(arr.slice(i, i + 16).reduce((a, b) => a ^ b, 0));
      }
      return dense;
    };

    const makeHexHash = (arr) => {
      return arr.reduce((a, b) => {
        let hex = b.toString(16);
        if(hex.length < 2) {
          hex = '0' + hex;
        }
        return a += hex;
      }, '');
    }

    const runHash = (rep) => {
      inputLengths.forEach((length, indx) => {
        // select the indexes in the list from currentPos to inputLength and reverse them
        // going beyond the list lenght results in wrapping back to start index
        let selectedReversed = list.slice(currentPos, currentPos + length).reverse();
        if(currentPos + length > list.length) {
          selectedReversed = [...list.slice(currentPos, list.length - 1), ...list.slice(0, length - (list.length - 1 - currentPos))].reverse();
        }
        const cap = selectedReversed.length;
        for(let i = currentPos; i < currentPos + cap; i++) {
          if(i >= list.length) {
            list[i % list.length] = selectedReversed.shift();
          } else {
            list[i] = selectedReversed.shift();
          }
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
      // do once
      runHash();
      return list[0] * list[1];
    }

    // do a bunch of times
    for (let i = 0; i < repititions; i++) {
      runHash(i);
    }

    return makeHexHash(makeDenseHash(list));
  };

  console.log(knotHash(data.split(',').map(Number)));

  const dataAsAscii = data.trim().split('').map(makeAscii);
  dataAsAscii.push(17, 31, 73, 47, 23)
  console.log(knotHash(dataAsAscii, 64));
});