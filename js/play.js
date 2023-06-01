"use strict";
import { messageEndGame, messageError } from "./utils/messages.js";
import { requestAPI } from "./api.js";
import { alphabet } from "./utils/lists.js";

import {
  changeElementCaractere,
  changeHangmanImage,
  cleanElement,
  showElement,
  showChoisenLetter,
} from "./utils/connectionElements.js";

import {
  validateCaractere,
  verifyLetterInWord,
  generateWordArray,
  getUrlByID,
} from "./utils/utils.js";

let arrayWord = [];
let word = "";
let choisenLetter = [];
let letterIndexInWord = [];
let amountErrors = [];
let replaceWord = 0;

// let handleWord = {
//   arrayWord: ["1", "2"],
//   word: "abcde",
//   choisenLetter: [],
//   letterIndexInWord: [],
//   amountErrors: 0,
//   replaceWord: [],
// };

// const resetValuesObject = (object) => {
//   let newObject = {};

//   for (let [key, value] of Object.entries(object)) {
//     newObject[key] = Array.isArray(value) ? [] : "";
//   }
// };

const startNewGame = async () => {
  // resetValuesObject(handleWord);

  letterIndexInWord = [];
  choisenLetter = [];
  amountErrors = 0;
  cleanElement([
    "#cardLetrasEscolhidas",
    "#cardPalavra",
    "#nameTheme",
    "#cardLetra",
  ]);

  changeHangmanImage(amountErrors);

  const idTheme = location.search.split("=")[1];

  if (!idTheme) {
    return messageError();
  }

  const { url, name } = getUrlByID(idTheme);

  if (!url) {
    return messageError();
  }

  const { status, payload } = await requestAPI(url);

  if (status == "error") {
    return messageError();
  }

  const arrayGenerated = generateWordArray(payload);

  word = arrayGenerated.word;
  arrayWord = arrayGenerated.arrayWord;
  replaceWord = arrayGenerated.arrayWord.map((letter) =>
    validateCaractere(letter)
  );
  replaceWord.map((caractere) => changeElementCaractere(caractere));

  const configElement = {
    element: "#cardLetra",
    classStyle: "letras",

    functionClick: existeNaPalavra,
  };

  let configElementTheme = {
    element: "#nameTheme",
    classStyle: "nameTheme",
    content: name,
  };

  showElement(configElementTheme);

  alphabet.map((item) =>
    showElement({ ...configElement, content: item, id: item })
  );
};

const formarPalavra = () => {
  cleanElement("#cardPalavra");

  letterIndexInWord.filter(
    ({ indice, letra }) => (replaceWord[indice] = letra)
  );
  replaceWord.map((caractere) => changeElementCaractere(caractere));
};

export const existeNaPalavra = (e) => {
  const letter = e.target.id;
  const letterRepeted = verifyLetterInWord(letter, choisenLetter);

  if (letterRepeted) {
    return;
  }

  if (amountErrors == 6) {
    return messageEndGame(startNewGame, word);
  }

  choisenLetter.push(letter);
  showChoisenLetter(choisenLetter);

  const verify = verifyLetterInWord(letter, arrayWord);

  if (!verify) {
    amountErrors = amountErrors + 1;
    changeHangmanImage(amountErrors);
    return;
  }

  arrayWord.filter(
    (letterWord, index) =>
      letterWord == letter &&
      letterIndexInWord.push({ indice: index, letra: letter })
  );

  formarPalavra();
};

const redirectHome = () => {
  window.location.href = "index.html";
};

document.getElementById("changeTheme").addEventListener("click", redirectHome);
document.addEventListener("DOMContentLoaded", startNewGame);
document
  .getElementById("btnPalavraAleatoria")
  ?.addEventListener("click", startNewGame);
