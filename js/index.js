"use strict";
import { messageEndGame, messageError } from "./utils/messages.js";
import { requestAPI } from "./api.js";
import {
  changeElementCaractere,
  changeHangmanImage,
  cleanElement,
  showAlphabet,
  showChoisenLetter,
} from "./utils/connectionElements.js";

import {
  alphabet,
  validateCaractere,
  verifyLetterInWord,
  generateWordArray,
  listThemes,
  getUrlByTheme,
} from "./utils/utils.js";

let arrayWord = [];
let word = "";
let choisenLetter = [];
let letterIndexInWord = [];
let amountErrors = [];
let replaceWord = 0;

const getThemeUrl = () => {
  const themeUrl = location.search.split("=")[1];

  if (!themeUrl) {
    return messageError();
  }

  const arrayThemes = listThemes();
  const validateTheme = arrayThemes.filter((theme) => theme == themeUrl)[0];

  if (!validateTheme) {
    return messageError();
  }

  
  const urlRequestTheme = getUrlByTheme(themeUrl);

  return urlRequestTheme;
};

const startNewGame = async () => {
  const theme = getThemeUrl();

  letterIndexInWord = [];
  choisenLetter = [];
  amountErrors = 0;
  cleanElement("#cardLetrasEscolhidas");
  cleanElement("#cardPalavra");
  changeHangmanImage(amountErrors);

  const { status, payload } = await requestAPI(theme);

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

  alphabet.map((item) => showAlphabet(item));
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

document.addEventListener("DOMContentLoaded", startNewGame);
document
  .getElementById("btnPalavraAleatoria")
  ?.addEventListener("click", startNewGame);
