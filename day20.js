const fs = require('fs');

fs.readFile('inputs/day20.txt', 'utf8', (err, data) => {
  const particles = data.trim().split('\n').map((l) => l.split(', ').map((o) => o.replace(/[a-z]{1}=</g,'').replace('>','').split(',').map(Number)));
  let unCollided = particles;
  const p = x = 0;
  const v = y = 1;
  const a = z = 2;
  const distFromOrigin = ([x, y, z]) => Math.abs(x) + Math.abs(y) + Math.abs(z);
  const haveCollided = ([x, y, z], [x2, y2, z2]) => x === x2 && y === y2 && z === z2; 
  
  for(let k = 0; k < particles.length; k++) {
    // move em
    for(let i = 0; i < particles.length; i++) {
      particles[i][v][x] += particles[i][a][x];
      particles[i][v][y] += particles[i][a][y];
      particles[i][v][z] += particles[i][a][z];
      particles[i][p][x] += particles[i][v][x];
      particles[i][p][y] += particles[i][v][y];
      particles[i][p][z] += particles[i][v][z];
      if(!particles[i][3]) {
        particles[i].push(i);
      }

    }
  }

  particles.sort((a, b) => distFromOrigin(a[p]) - distFromOrigin(b[p]));

  // part 1
  console.log(particles[0][3]);
});