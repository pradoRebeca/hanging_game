import { themes } from "../api.js";

export const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export const nameImages = [
  "hangman.jpg",
  "head.jpg",
  "trunk.jpg",
  "armLeft.jpg",
  "armRigth.jpg",
  "legRigth.jpg",
  "body.jpg",
];

export function validateCaractere(caractere) {
  if (caractere == "-" || caractere == "(" || caractere == ")") {
    return caractere;
  }

  if (caractere == " ") {
    return "-";
  }

  return "_";
}

export function verifyLetterInWord(letter, arrayWord) {
  const verify = arrayWord.filter((item) => item == letter.toUpperCase());

  return verify.length > 0;
}

export function generateWordArray(json) {
  let arrayLetterWord = json.map((obj) => obj.nome);
  let randomNumber = Math.floor(Math.random() * arrayLetterWord.length + 1);

  const word = arrayLetterWord
    .filter((_item, index) => index === randomNumber)
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const arrayWord = word.toUpperCase().split("");

  return {
    word,
    arrayWord,
  };
}

export function listThemes() {
  const arrayKeys = Object.keys(themes);

  return arrayKeys.map((theme) => themes[theme].name);
}

export function getUrlByTheme(theme) {
  const arrayKeys = Object.values(themes);
  const infoTheme = arrayKeys.filter((item) => item.name == theme);
  return infoTheme.url
}
