const aFactor = 16807;
const bFactor = 48271;
const divider = 2147483647;
const padLeft = s => '000000000000000000000000000000'.substring(0, 30 - s.length) + s;

const getMatches = (aSt, bSt, max, aMult, bMult) => {
  let counter = 0;
  let matches = 0;
  let aPrev = aSt;
  let bPrev = bSt;
  const useMults = aMult && bMult;
  let pairs = [];

  while(counter < max) {
    const a = (aPrev * aFactor) % divider;
    const b = (bPrev * bFactor) % divider;
    
    if (useMults) {
      if (a % aMult === 0) {
        pairs.push([padLeft(a.toString(2)).slice(-16), 0]);
      }

      if (b % bMult === 0) {
        pairs.push([0, padLeft(b.toString(2)).slice(-16)]);
      }
    }

    aPrev = a;
    bPrev = b;
  
    if(padLeft(a.toString(2)).slice(-16) === padLeft(b.toString(2)).slice(-16) && !useMults) {
      matches++;
    }
  
    counter++;
  }

  if(useMults) {
    // read pairs
    console.log('parsing pairs');
    const aArr = pairs.filter((p) => p[0]);
    const bArr = pairs.filter((p) => p[1]);

    while(aArr.length && bArr.length) {
      if(aArr.shift()[0] === bArr.shift()[1]) {
        console.log('match!', aArr.length, bArr.length);
        matches++;
      }
    }
  }
  console.log('end!');
  return matches;
};

// part 1
// console.log(getMatches(679, 771, 40000000));

// part 2
console.log(getMatches(679, 771, 5000000, 4, 8));

