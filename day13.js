const fs = require('fs');

fs.readFile('inputs/day13.txt', 'utf8', (err, data) => {
  const buildFirewall = () => {
    // mod data
    let firewall = [];

    // build firewall from input
    const input = data.trim().split('\n').forEach((line) => {
      const layerNum = parseInt(line.split(': ')[0], 10);
      const depth = parseInt(line.split(': ')[1], 10);
      const layer = [...Array(depth)];
      layer[0] = 'S:DOWN';
      firewall[layerNum] = layer;
    });

    // return fresh wall for each test
    return firewall;
  }

  const calcRoute = (wall, delay = 0, needSeverity = true) => {
    let location = -1;
    let time = 0;
    let severity = 0;

    // while location is not at the end of the wall
    while(location < wall.length - 1) {
      // move first but take into account delay if given
      if(time >= delay || delay === 0) {
        // move
        location++;
        // if there is an array at the location in the wall and a security bot is there
        if(wall[location] && (wall[location][0] === 'S:DOWN' || wall[location][0] === 'S:UP')) {
          // CAUGHT! - add to the severity
          severity = severity + (location * wall[location].length);
          // if you dont need the severity just return one - for part 2 - attempt to shorten the long time
          if(!needSeverity) {
            severity = 1;
            break;
          }
        }
      }

      // add time
      time++;
      
      // security management
      wall.forEach((arr) => {
        // if the location in the wall has a security bot
        if(arr) {
          // find its location
          let securityLoc = arr.indexOf('S:DOWN');
          if(securityLoc < 0) {
            securityLoc = arr.indexOf('S:UP');
          }
          // find its current movement
          let movement = '';
          // set movement direction
          if(securityLoc === arr.length - 1) {
            movement = 'UP';
          } else if (securityLoc === 0) {
            movement = 'DOWN';
          } else {
            movement = arr[securityLoc].split(':').pop();
          }
          // clear current location
          arr[securityLoc] = undefined;
          // move the security
          if(movement === 'DOWN') {
            arr[securityLoc + 1] = 'S:' + movement;
          } else if (movement === 'UP') {
            arr[securityLoc - 1] = 'S:' + movement;
          }
        }
      });
    }

    return severity;
  };

  // part 1
  console.log(calcRoute(buildFirewall()));

  let delay = 0;
  while(calcRoute(buildFirewall(), delay, false)) {
    delay++;
  }

  // part 2
  console.log(delay);
});