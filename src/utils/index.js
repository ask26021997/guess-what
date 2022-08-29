const randomWord = require("random-word-by-length");
module.exports.colorMap = (correctWord, lastGuess, index) => {
  if (lastGuess[index] == correctWord[index]) return "card text-bg-success";
  if (correctWord.includes(lastGuess[index])) return "card text-bg-warning";
  return "card text-bg-danger";
};

module.exports.getWordToGuess = () => {
  let wordToGuess = "";
  while (wordToGuess.length != 5) wordToGuess = randomWord(5);
  return wordToGuess;
};

module.exports.playerNameDecorator = (nameString) => {
  nameString = nameString.toLowerCase();
  let nameArray = [];
  for (let name of nameString.split(" ")) {
    if(name == "") continue;
    let temp = name[0].toUpperCase() + name.slice(1);
    nameArray.push(temp);
  }
  return nameArray.join(" ");
};
