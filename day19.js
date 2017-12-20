const fs = require('fs');

fs.readFile('inputs/day19.txt', 'utf8', (err, data) => {
  // txt as 2d array. each char an index 201x201 I think
  const map = data.split('\n').map((line) => line.split(''));
  // clear the junk
  map.pop();

  // starting coordinates
  let location = [0, data.indexOf('|')];
  
  // starts down
  let direction = 'down';
  
  // count letters
  const numberOfLetters = data.trim().match(/[A-Z]/g).length;
  // keeps track of the letters it passes
  let solution = '';
  // keeps track of steps
  let steps = 0;
  
  // edits current location based on movement direction
  const move = {
    up: (x, y) => [x - 1, y],
    down: (x, y) => [x + 1, y],
    left: (x, y) => [x, y - 1],
    right: (x, y) => [x, y + 1],
  };
  
  // changes direction
  const changeDirection = ([x, y]) => {
    if(direction === 'up' || direction === 'down') {
      if(map[x][y + 1] === '-') {
        return 'right';
      } else {
        return 'left'
      }
    } else {
      if(map[x - 1][y] === '|') {
        return 'up';
      } else {
        return 'down'
      }
    }
  };

  // solve
  while (solution.length !== numberOfLetters) {
    const currentLoc = map[location[0]][location[1]];

    if (currentLoc.match(/[A-Z]/g)) {
      // add the letter
      solution += currentLoc;
    }

    if(currentLoc === '+') {
      // change direction
      direction = changeDirection(location);
    }

    // movin right along
    location = move[direction](location[0], location[1]);
    steps++;
  }

  // part 1
  console.log(solution);
  // part 2
  console.log(steps);
});