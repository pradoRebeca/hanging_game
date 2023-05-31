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
} from "./utils/utils.js";

let arrayWord = [];
let word = "";
let letterWord = [];
let choisenLetter = [];
let letterIndexInWord = [];
let amountErrors = [];
let replaceWord = 0;

const startNewGame = async () => {
  letterWord = [];
  letterIndexInWord = [];
  choisenLetter = [];
  amountErrors = 0;
  cleanElement("#cardLetrasEscolhidas");
  cleanElement("#cardPalavra");
  changeHangmanImage(amountErrors);

  const { status, payload } = await requestAPI();

  if (status == "error") {
    // console.log("error", status.error);
    return messageError();
  }

  const arrayGenerated = generateWordArray(payload);

  word = arrayGenerated.word;
  arrayWord = arrayGenerated.arrayWord;
  replaceWord = arrayGenerated.arrayWord.map((letter) =>
    validateCaractere(letter)
  );
  replaceWord.map((caractere) => changeElementCaractere(caractere));

  // arrayGenerated.arrayWord.map((letter) => {
  //   const caractere = validateCaractere(letter);
  //   replaceWord.push(caractere);
  //   changeElementCaractere(caractere);
  // });

};

const listAlphabet = () => {
  return alphabet.map((item) => showAlphabet(item));
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

  choisenLetter.push(letter);
  showChoisenLetter(choisenLetter);

  if (amountErrors == 6) {
    return messageEndGame(startNewGame, word);
  }

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

  letterWord.push(letter);
  formarPalavra();
};

document.addEventListener("DOMContentLoaded", listAlphabet);
document.addEventListener("DOMContentLoaded", startNewGame);
document
  .getElementById("btnPalavraAleatoria")
  .addEventListener("click", startNewGame);
