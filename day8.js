const fs = require('fs');

fs.readFile('inputs/day8.txt', 'utf8', (err, data) => {
  // stores values
  const values = {};
  // for tracking the highest value held at any time
  let highestValueHeld = 0;
  // for comparing
  const comparators = {
    "==": (a, b) => a == b,
    "!=": (a, b) => a != b,
    ">": (a, b) => a > b,
    "<": (a, b) => a < b,
    ">=": (a, b) => a >= b,
    "<=": (a, b) => a <= b,
  };

  // run the rule
  const runRule = (obj) => {
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
  };
  
  const buildRule = (line) => {
    const condition = line.split(' if ').pop().split(' ');
    const todo = line.split(' if ')[0].split(' ');
    return {
      conditionName: condition[0],
      comparator: condition[1],
      valToCompare: parseInt(condition[2], 10),
      nameToChange: todo[0],
      change: todo[1],
      valToChange: parseInt(todo[2], 10), 
    };
  };

  data.trim().split('\n').map(buildRule).forEach(runRule);

  // part 1
  console.log(values[Object.keys(values).sort((a,b) => values[b] - values[a])[0]]);

  // part 2
  console.log(highestValueHeld);
});

