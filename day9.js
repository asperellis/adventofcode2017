const fs = require('fs');

fs.readFile('inputs/day9.txt', 'utf8', (err, data) => {
  // any ! + char = ignore so could technically replace all the !* with nothing
  // then clear all the garbage <*> and any <> left
  let input = data.replace(/\!.{1}/g, '').replace(/(<([^>]+)>)/g, '').replace(/[<>,]/g, '');
  let score = 0;
  let total = 0;

  // str is now only { & }'s so move up as the objs nest and down when one closes
  for(let i = 0; i < input.length; i++) {
    if (input[i] == "{") {
      score++;
    } else if (input[i] == "}") { 
      total += score--;
    }
  }

  // part 1
  console.log(total);

  // part 2 - just remove the canceled chars and then match all the garbage. return length of string inside garbage flags
  console.log(data.replace(/\!.{1}/g, '').match(/(<([^>]+)>)/g, '').reduce((acc, garbage) => acc += garbage.slice(1, garbage.length - 1).length, 0));
});