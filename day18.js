const fs = require('fs');

fs.readFile('inputs/day18.txt', 'utf8', (err, data) => {
  const movements = data.trim().split('\n').map((d) => {
    const line = d.split(' ');

    return {
      task: line[0],
      name: line[1],
      value: Number(line[2]) ? Number(line[2]) : line[2]
    }
  });

  const recoverNote = (moves, programs = 0) => {
    const actions = {
      snd: (name) => {
        if(!programs) {
          frequency = notes[name];
          return;
        }

      },
      set: (name, value) => notes[name] = typeof value === 'number' ? value : notes[value],
      add: (name, value) => notes[name] += typeof value === 'number' ? value : notes[value],
      mul: (name, value) => notes[name] *= typeof value === 'number' ? value : notes[value],
      mod: (name, value) => {
        let mod = value;
        if(typeof value !== 'number') {
          mod = notes[value];
        }
        notes[name] = notes[name] % mod;
        return;
      },
      rcv: (name) => {
        if(!programs) {
          if(notes[name]) {
            recovered = true;
          }
          return;
        }

      },
      jgz: (name, value) => {
        if(notes[name]) {
          // for loop becasue we will get a ++ added after this is returned
          index += value - 1;
        }
        return;
      },
    };

    let recovered = false;
    let frequency = 0;
    let index = 0;
    let notes = {};
    /*
    snd X plays a sound with a frequency equal to the value of X.
    set X Y sets register X to the value of Y.
    add X Y increases register X by the value of Y.
    mul X Y sets register X to the result of multiplying the value contained in register X by the value of Y.
    mod X Y sets register X to the remainder of dividing the value contained in register X by the value of Y (that is, it sets X to the result of X modulo Y).
    rcv X recovers the frequency of the last sound played, but only when the value of X is not zero. (If it is zero, the command does nothing.)
    jgz X Y jumps with an offset of the value of Y, but only if the value of X is greater than zero. (An offset of 2 skips the next instruction, an offset of -1 jumps to the previous instruction, and so on.)
    */
    while(!recovered) {
      const move = moves[index];
      if(!notes[move.name]) {
        notes[move.name] = 0;
      }
      actions[move.task](move.name, move.value);
      index++;
    }

    return frequency;
  };

  console.log(recoverNote(movements));
});