const fs = require('fs');

fs.readFile('inputs/day8.txt', 'utf8', (err, data) => {
  // map each line into an obj for easier use
  const input = data.trim().split('\n').map((instruction) => {
    const condition = instruction.split(' if ').pop().split(' ');
    const todo = instruction.split(' if ')[0].split(' ');
    return {
      conditionName: condition[0],
      comparator: condition[1],
      valToCompare: parseInt(condition[2], 10),
      nameToChange: todo[0],
      change: todo[1],
      valToChange: parseInt(todo[2], 10), 
    };
  });

  // for comparing
  const comparators = {
    "==": (a, b) => a == b,
    "!=": (a, b) => a != b,
    ">": (a, b) => a > b,
    "<": (a, b) => a < b,
    ">=": (a, b) => a >= b,
    "<=": (a, b) => a <= b,
  };

  const values = {};
  let highestValueHeld = 0;

  // follow the rules
  input.forEach((obj) => {
    const conditionValue = values[obj.conditionName] || 0;
    const conditionMet = comparators[obj.comparator](conditionValue, obj.valToCompare);
  
    if(conditionMet) {
      // set the value to zero when undefined
      if(!values[obj.nameToChange]) {
        values[obj.nameToChange] = 0;
      }

      // perform the instruction inc or dec only
      if(obj.change === 'inc') {
        values[obj.nameToChange] += obj.valToChange;
      } else {
        values[obj.nameToChange] -= obj.valToChange;
      }

      // for keeping track of largest value held
      if(values[obj.nameToChange] > highestValueHeld) {
        highestValueHeld = values[obj.nameToChange];
      }
    }
  });

  // part 1
  console.log(values[Object.keys(values).sort((a,b) => values[b] - values[a])[0]]);

  // part 2
  console.log(highestValueHeld);
});

