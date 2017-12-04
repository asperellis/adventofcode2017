const input = document.querySelector('pre').innerText.trim().split('\n');

// takes a string of words separated by spaces and returns true only if the string has all unique words
const hasUniqueWords = (phrase) => {
  const phraseArr = phrase.trim().split(' ');
  // make sure array doesn't have any indexes with duplicate values
  return phraseArr.filter((word, i, arr) => arr.indexOf(word) === i).length === phraseArr.length;
};

// takes a string of words separated by spaces and returns true only if the string has words that are anagrams of another word in the string
const anagramCheck = (phrase) => {
  const phraseArr = phrase.trim().split(' ');
  let hasAnagrams = false;
  
  // take each word and compare it to the other words in the array
  while(phraseArr.length) {
    // sort by char to do a character comparison
    const word = phraseArr.pop().split('').sort().join('');
    
    // if the length and chars of the word are the same then they are anagrams and must return true. no need to continue searching.
    if(phraseArr.filter((w) => w.length === word.length && w.split('').sort().join('') === word).length) {
      hasAnagrams = true;
      break;
    }
  }

  return hasAnagrams;
};

// part 1 solution
console.log(input.filter((passPhrase) => hasUniqueWords(passPhrase)).length);

// part 2 solution
console.log(input.filter((passPhrase) => hasUniqueWords(passPhrase) && !anagramCheck(passPhrase)).length);