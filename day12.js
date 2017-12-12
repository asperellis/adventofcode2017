const fs = require('fs');

fs.readFile('inputs/day12.txt', 'utf8', (err, data) => {
  // turns each line of data (ie 0 <-> 412, 480, 777, 1453) into [0, [412, 480, 777, 1453]]
  const input = data.trim().split('\n').map((d) => d.split(' <-> ')).map((line) => {
    const id = parseInt(line[0], 10);
    const communicatesWith = line[1] ? line[1].split(', ').map(Number) : null;
    return [id, communicatesWith];
  });

  // pass in id of channel and return count of all the channels that communicate with the given channel id
  const whoCommunicatesWith = (id, community) => {
    // direct communicators of the given id in the community
    const directCommunicators = [...community.filter((channel) => channel[0] === id).pop()[1]];
    // array to track the communicators connected to id indirectly via channel lines
    let indirectCommunicators = [];

    // goes down the line of communicators children to add to communication line
    const communicationCheck = (oc) => {
      // the children of an id (oc)
      const communicatesWith = community.filter((channel) => channel[0] === oc).pop()[1];
      // for each child
      communicatesWith.forEach((c) =>{
        // if they aren't an indirect, direct or the original id add to indirect channel and then add its children
        if(indirectCommunicators.indexOf(c) < 0 && c !== id && directCommunicators.indexOf(c) < 0) {
          indirectCommunicators.push(c);
          communicationCheck(c);
        }
      });
    };

    // add all indirect children of the direct children
    directCommunicators.forEach(communicationCheck);

    // return orignal id, direct and indirect children
    return [id, ...directCommunicators, ...indirectCommunicators];
  };

  // takes a community of channels and returns how many groups of communications are within it.
  const howManyGroups = (com) => {
    // count tracker
    let groupCount = 0;
    // clone of param
    let community = com;
    // we will find a group then remove it from the community and continue until there isn't anything left to group
    while(community.length > 0) {
      // first id in the community
      const id = community[0][0];
      // get all the ids that communicate with the id
      const communicatesWithId = whoCommunicatesWith(id, community);
      // update the community to remove all ids group
      community = community.filter((channel) => communicatesWithId.indexOf(channel[0]) < 0);
      // add to the group count
      groupCount++;
    }

    // return the group number
    return groupCount;
  };

  // part 1
  console.log(whoCommunicatesWith(0, input).length);

  // part 2
  console.log(howManyGroups(input));
});


