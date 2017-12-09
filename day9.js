const fs = require('fs');

fs.readFile('inputs/day9.txt', 'utf8', (err, data) => {
  // any ! + char = ignore so could technically replace all the !* with nothing
  // then clear all the garbage <*> and any <> left
  let input = data.replace(/\!.{1}/g, '').replace(/(<([^>]+)>)/g, '').replace(/<>/g, '');

  console.log(input);
});