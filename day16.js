const fs = require('fs');

fs.readFile('inputs/day16.txt', 'utf8', (err, data) => {
  // maps instructions into object in format { rule: str, first: str||int, second (optional): str||int }
  const instructions = data.trim().split(',').map((d) => {
    const instruction = {};
    const str = d.toString();
    if(str.indexOf('/') >= 0) {
      instruction.rule = str.slice(0, 1);
      instruction.first = str.slice(0, 1) === 'p' ? str.slice(1).split('/')[0] : Number(str.slice(1).split('/')[0]);
      instruction.second = str.slice(0, 1) === 'p' ? str.slice(1).split('/')[1] : Number(str.slice(1).split('/')[1]);
    } else {
      instruction.rule = str.slice(0, 1);
      instruction.first = parseInt(str.slice(1), 10);
    }
    return instruction;
  });

  // functions to spin, exchange, and partner
  const actions = {
    s: (a, n) => {
      for(let i = 0; i < n; i++) {
        a.unshift(a.pop());
      }

      return a;
    },
    x: (a, f, s) => {
      const first = a[f];
      const second = a[s];

      a[f] = second;
      a[s] = first;

      return a;
    },
    p: (a, f, s) => {
      const firstIndex = a.indexOf(f);
      const secondIndex = a.indexOf(s);

      a[firstIndex] = s;
      a[secondIndex] = f;

      return a;
    }
  };

  /*
    Spin, written sX, makes X programs move from the end to the front, but maintain their order otherwise. (For example, s3 on abcde produces cdeab).
    Exchange, written xA/B, makes the programs at positions A and B swap places.
    Partner, written pA/B, makes the programs named A and B swap places.
  */
  const sort = (arr, list, reps = 1) => {
    let sorted = arr;
    let counter = 0;
    const past = {};

    while (counter < reps) {
      const old = sorted;
      if(past[old.join('')]) {
        sorted = past[old.join('')];
      } else {
        for(let i = 0; i < list.length; i++) {
          sorted = actions[list[i].rule](arr, list[i].first, list[i].second);
        }
        past[old.join('')] = sorted; 
      }
      counter++;
    }

    return sorted.join('');
  };

  // the start
  const programs = [...'abcdefghijklmnop'];

  // part 1
  console.log(sort(programs, instructions));
  
  // part 2 - sloooow need help here
  console.log(sort(programs, instructions, 1000000000));
});