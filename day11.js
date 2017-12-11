const fs = require('fs');

fs.readFile('inputs/day11.txt', 'utf8', (err, data) => {
  // directions to move and update coords per each diff path
  const directions = {
    n: (coords) => { return {x: coords.x, y: coords.y - 1}},
    ne: (coords) => { return {x: coords.x + 1, y: coords.y - 1}},
    nw: (coords) => { return {x: coords.x - 1, y: coords.y}},
    s: (coords) => { return {x: coords.x, y: coords.y + 1 }},
    se: (coords) => { return {x: coords.x + 1, y: coords.y }},
    sw: (coords) => { return {x: coords.x - 1, y: coords.y + 1 }},
  };

  // math taken from online
  const getDistance = (coords) => {
    return Math.sign(coords.x) === Math.sign(coords.y) ? Math.abs(coords.x) + Math.abs(coords.y) : Math.max(Math.abs(coords.x), Math.abs(coords.y));
  };

  // move takes a start coordinate and list of steps and returns end coordinates
  const move = (start, steps) => {
    let end = start;
    // keeps track of the farthest point away
    let farthestSteps = 0;

    data.split(',').forEach((i) => {
      // move and update end point
      end = directions[i.trim()](end);
      // update
      if(getDistance(end) > farthestSteps) {
        farthestSteps = getDistance(end);
      }
    });

    return { stepsAway: getDistance(end), farthestSteps };
  }
  
  const traveler = move({ x: 0, y: 0}, data);
  
  // part 1
  console.log(traveler.stepsAway);
  
  //part 2
  console.log(traveler.farthestSteps);
});