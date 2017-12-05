const input = document.body.innerText.trim().split('\n').map((s) => parseInt(s, 10));

// takes array (maze) and a param to decide whether to increment past spaces by 1 or increase and decrease by one based on its value being >= 3
const stepsToExit = (maze, incAndDec = false) => {
  const mazeClone = [...maze];
  let location = 0;
  let steps = 0;

  // while the location is inside the maze bounds
  while(location >= 0 && location < mazeClone.length) {
    const stepsToTake = mazeClone[location];
    if(stepsToTake >= 3 && incAndDec) {
      mazeClone[location] = mazeClone[location] - 1;
    } else {
      mazeClone[location] = mazeClone[location] + 1;
    }
    location += stepsToTake;
    steps++;
  }

  return steps;
};

// part 1
console.log(stepsToExit(input));

// part 2 - just used second input so running in console would work.
console.log(stepsToExit(input, true));