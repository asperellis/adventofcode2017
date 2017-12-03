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
    while(row.length) {
      const n = row.pop();
      const n2 = row.filter((n2) => n % n2 === 0).pop();
      if(n2) {
        checkSum += n / n2;
        break;
      }
    }
  });
  return checkSum;
};

console.log(calcCheckSum(spreadsheet));
console.log(calcCheckSum2(spreadsheet));