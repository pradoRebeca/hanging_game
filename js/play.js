"use strict";
import {
  messageEndGame,
  messageError,
  messageWinnerGame,
} from "./utils/messages.js";
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

const startNewGame = async () => {
  cleanElement([
    "#cardLetrasEscolhidas",
    "#cardPalavra",
    "#nameTheme",
    "#cardLetra",
  ]);

  letterIndexInWord = [];
  choisenLetter = [];
  amountErrors = 0;

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

  replaceWord = arrayGenerated.arrayWord.map((letter) => {
    arrayWord.push(letter);
    const caractere = validateCaractere(letter);
    changeElementCaractere(caractere);
    return caractere;
  });

  console.log("word", arrayWord);

  showElement({
    element: "#nameTheme",
    classStyle: "nameTheme",
    content: name,
  });

  alphabet.map((item) =>
    showElement({
      element: "#cardLetra",
      classStyle: "letras",
      content: item,
      id: item,
      functionClick: existeNaPalavra,
    })
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

  if (letterIndexInWord.length == arrayWord.length) {
    messageWinnerGame();
  }

 return formarPalavra();
};

const redirectHome = () => {
  window.location.href = "index.html";
};

document.getElementById("changeTheme").addEventListener("click", redirectHome);
document.addEventListener("DOMContentLoaded", startNewGame);
document
  .getElementById("btnPalavraAleatoria")
  ?.addEventListener("click", startNewGame);
