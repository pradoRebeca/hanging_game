import { themes } from "./lists.js";

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
  let arrayLetterWord = json.map((obj) => obj.name);

  const word = generateRandomWord(arrayLetterWord)
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const arrayWord = word.toUpperCase().split("");

  return {
    word,
    arrayWord,
  };
}

export function generateRandomWord(array) {
  let randomNumber = Math.floor(Math.random() * array.length + 1);
  return array.filter((_item, index) => index === randomNumber);
}

export function getUrlByID(id) {
  const infoTheme = themes.filter((item) => item.id == id)[0];

  if (!infoTheme) {
    return false;
  }

  return infoTheme;
}

export function validateResponseAPI(json) {
  if (json.results) {
    return json.results;
  }

  if (!Array.isArray(json)) {
    return [];
  }

  return json.map((item) => ({ name: item.nome }));
}
