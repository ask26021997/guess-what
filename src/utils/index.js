const randomWord = require("random-word-by-length");
module.exports.colorMap = (correctWord, lastGuess, index) => {
  if (lastGuess[index] == correctWord[index]) return "card text-bg-success";
  if (correctWord.includes(lastGuess[index])) return "card text-bg-warning";
  return "card text-bg-danger";
}

module.exports.getWordToGuess = () => {
  let wordToGuess = "";
  while (wordToGuess.length != 5) wordToGuess = randomWord(5);
  return wordToGuess;
}


