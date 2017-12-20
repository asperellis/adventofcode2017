const spinLock = (reps, endPoint) => {
  const steps = 301;
  let counter = 0;
  const log = [0];
  let currentLocation = 1;
  
  while(counter <= reps) {
    counter++;
    log.splice(((steps + currentLocation) % log.length) + 1, 0, counter);
    currentLocation = log.indexOf(counter);
  }

  return log[log.indexOf(endPoint) + 1];
};

// part 1
console.log(spinLock(2017, 2017));

// part 2
console.log(spinLock(50000000, 0));