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

  // updates the total property to be the objs size + size of all its children
  const calculateSizes = (root, tree) => {
    tree[root].total = tree[root].size;
    tree[root].children.forEach((c) => {
        tree[root].total += calculateSizes(c, tree);
    });

    return tree[root].total;
  };

  // taken for learning purposes online
  const balance = (root, tree, target) => {
    const children = {};
    let newTarget;

    // they are using the total value and storing in an obj to cross check
    tree[root].children.forEach((c) => {
        if(children[tree[c].total] === undefined) {
            children[tree[c].total] = c;
        } else {
            // then if theres already a value of the same size in children obj, flag as false
            // new target 
            children[tree[c].total] = false;
            newTarget = tree[c].total;
        }
    });

    // go through the children obj and find the one not set to false and recurse to go down the tree to find the broken level
    for(const i in children) {
        if(children[i]) {
            return balance(children[i], tree, newTarget);
        }
    }
    
    return tree[root].size + target - tree[root].total;
  };

  // data
  arr.forEach((str) => {
     const name = str.split(' ').shift();
     const size = parseInt(str.slice(str.indexOf('(') + 1, str.indexOf(')')), 10);
     let children = [];
     if(str.split('->')[1]) {
       children = str.split('->')[1].trim().split(', ');
     }
     data[name] = { size, children, total: 0 };
  });

  // get the sizes
  calculateSizes(parent, data);
  return balance(parent, data);
};

// part 1 - if the parent name isnt in the children names its the root
console.log(findRoot(input));

// part 2 - balancing
console.log(balanceDisks(input, findRoot(input)));
});




