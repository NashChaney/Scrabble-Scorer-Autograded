// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};


// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble! Enter a word:");
};


function simpleScorer(word) {
 word = word.toUpperCase();
 score = word.length;

 return score;
}

function vowelBonusScorer(word) {
   word = word.toUpperCase();
   let score = 0;
 
   for (let i = 0; i < word.length; i++) {
     if ('AEIOU'.includes(word[i])) {
       score += 3;
     } else {
       score += 1;
     }
   }
   return score;
}

function scrabbleScorer(word) {
   word = word.toUpperCase();
   let score = 0;
 
   for (let i = 0; i < word.length; i++) {
     score += newPointStructure[word[i].toLowerCase()];
   }
   return score;
}

const scoringAlgorithms = [{ name: "Simple Score", description: "Each letter is worth 1 point.", scorerFunction: simpleScorer },
{ name: "Vowel Bonus", description: "Vowels are worth 3 points, and consonants are worth 1 point.", scorerFunction: vowelBonusScorer },
{ name: "Traditional Scrabble", description: "The traditional scoring algorithm.", scorerFunction: scrabbleScorer }];

function scorerPrompt() {
   console.log("Please choose your scoring algorithm:");
  for (let i = 0; i < scoringAlgorithms.length; i++) {
    console.log(`${i}. ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`);
  }
  choice = input.question("Enter the number of your choice: ");
  scrabbleScorer = scoringAlgorithms[choice].scorerFunction;
}

let newPointStructure = {};

function transform(oldPointStructure) {
  for (const pointValue in oldPointStructure) {
    for (const letter of oldPointStructure[pointValue]) {
      newPointStructure[letter.toLowerCase()] = Number(pointValue);
    }
  }

  return newPointStructure;
}

transform(oldPointStructure);

    
function runProgram() {
   scorerPrompt();
   initialPrompt();
   word = input.question("");
   score = scrabbleScorer(word);
   console.log(`You word "${word}" scored ${score} points!`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //

module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
