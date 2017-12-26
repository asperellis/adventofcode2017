const aFactor = 16807;
const bFactor = 48271;
const divider = 2147483647;
const padLeft = s => '000000000000000000000000000000'.substring(0, 30 - s.length) + s;
const matches = (a, b) => padLeft(a.toString(2)).slice(-16) === padLeft(b.toString(2)).slice(-16);

const getMatches = (aSt, bSt, max, aMult, bMult) => {
  let counter = 0;
  let totalMatches = 0;
  let a = aSt;
  let b = bSt;
  const useMults = aMult && bMult;

  while(counter < max) {
    if(useMults) {
      do {
        a = (a * aFactor) % divider;
      } while(a % aMult !== 0);
      do {
        b = (b * bFactor) % divider;
      } while(b % bMult !== 0);
    } else {
      a = (a * aFactor) % divider;
      b = (b * bFactor) % divider;
    }
  
    if(matches(a, b)) {
      totalMatches++;
    }

    counter++;
  }

  return totalMatches;
};

// part 1
console.log(getMatches(679, 771, 40000000));

// part 2
console.log(getMatches(679, 771, 5000000, 4, 8));

