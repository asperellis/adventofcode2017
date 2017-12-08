const fs = require('fs');

fs.readFile('inputs/day7.txt', 'utf8', (err, data) => {
// only searching for root so filter out all without children
const input = data.trim().split('\n');

const findRoot = (arr) => {
  // get rid of any stacks without children becasue they can't be the root
  const onlyParents = arr.map((s) => s.split(/\s\([0-9]*\)\s->/g)).filter((arr) => arr.length > 1);
  // names of these parents
  const parentNames = onlyParents.map((arr) => arr[0].trim());
  // string of children names to cross check against parent
  const children = onlyParents.map((arr) => arr[1].trim()).join(', ');

  return parentNames.filter((p) => children.indexOf(p) < 0)[0];
};

const balanceDisks = (arr, parent) => {
  const data = {};

  // organize data better
  arr.forEach((str) => {
     const name = str.split(' ').shift();
     const size = parseInt(str.slice(str.indexOf('(') + 1, str.indexOf(')')), 10);
     let children = null;
     if(str.split('->')[1]) {
       children = str.split('->')[1].trim().split(', ');
     }
     data[name] = { size, children };
  });

  const setSizes = (disk) => {
    return {
      name: disk.name,
      size: disk.children ? disk.children.forEach((c) => {  disk.size += setSizes(c).size; }, 0) : disk.size,
      children: disk.children || null
    };
  };

  const buildTower = (name, info) => {
    return {
      name,
      children: info.children ? info.children.map((d) => buildTower(d, data[d])) : null,
      size: info.size,
    };
  };

  return setSizes(buildTower(parent, data[parent]));
};

// part 1 - if the parent name isnt in the children names its the root
console.log(findRoot(input));

// part 2 - balancing
console.log(balanceDisks(input, findRoot(input)));
});

