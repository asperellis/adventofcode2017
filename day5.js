const input = document.body.innerText.trim().split('\n').map((s) => parseInt(s, 10));

// takes array (maze) and a param to decide whether to increment past spaces by 1 or increase and decrease by one based on its value being >= 3
const stepsToExit = (maze, incAndDec = false) => {
  let location = 0;
  let steps = 0;

  // while the location is inside the maze bounds
  while(location >= 0 && location < maze.length) {
    const stepsToTake = maze[location];
    if(stepsToTake >= 3 && incAndDec) {
      maze[location] = maze[location] - 1;
    } else {
      maze[location] = maze[location] + 1;
    }
    location += stepsToTake;
    steps++;
  }

  return steps;
};

// part 1
console.log(stepsToExit(input));

// part 2
console.log(stepsToExit(input, true));