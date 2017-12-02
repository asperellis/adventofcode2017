// data
const spreadsheet = document.body.querySelector('pre').innerText.trim().split('\n').map((arr) => arr.split('\t'));

const cleanData = (data) => {
  return data.map((row, index, arr) => {
    // sort the row and turn strings into numbers
    return row.map((n) => parseInt(n, 10)).sort((a, b) => a - b);
  });
};

// takes rows of numbers and calculates the sum of the difference of the lowest and highest number in each row
const calcCheckSum = (data) => {
  let checkSum = 0;

  cleanData(data).forEach((row) => {
    const high = row.pop();
    const low = row.shift();
    checkSum += high - low;
  });
  
  return checkSum;
};

// takes rows of numbers and calculates the sum of the result of the only two numbers in the row that when divided return a whole number
const calcCheckSum2 = (data) => {
  let checkSum = 0;

  cleanData(data).forEach((row) => {
    for(let k = 0; k < row.length; k++) {
      const n = row[k];
      for(let i = 0; i < row.length; i++) {
        if(i !== k) {
          const n2 = row[i];
          if(n % n2 === 0) {
            checkSum += n / n2;
          }
        }
      }
    };
  });
  return checkSum
};

console.log(calcCheckSum(spreadsheet));
console.log(calcCheckSum2(spreadsheet));