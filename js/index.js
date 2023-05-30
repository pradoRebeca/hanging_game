"use strict";
import { messageEndGame } from "./utils/messages.js";

import {
  changeHangmanImage,
  cleanElement,
  replaceWordWithUnderline,
  showAlphabet,
  showChoisenLetter,
  showLetterInWord,
} from "./utils/connectionElements.js";

import {
  alphabet,
  validateCaractere,
  verifyLetterInWord,
} from "./utils/utils.js";

let arrayPalavra;

let nomePais;
let letrasDaPalavra = [];
let letrasEscolhidas = [];
var letterIndexInWord = [];
let quantidadeErros = 0;

const ListarPais = async () => {
  letrasDaPalavra = [];
  letterIndexInWord = [];
  letrasEscolhidas = [];
  quantidadeErros = 0;
  cleanElement("#cardLetrasEscolhidas");
  cleanElement("#cardPalavra");
  changeHangmanImage(quantidadeErros);

  const urlListar = `https://servicodados.ibge.gov.br/api/v1/localidades/paises?orderBy=nome`;
  const options = {
    method: "GET",
  };

  await fetch(urlListar, options)
    .then((resp) => resp.json())
    .then((json) => palavraGerada(json))
    .catch((err) => console.log(err));
};

const listAlphabet = () => {
  return alphabet.map((item) => showAlphabet(item));
};

const formarPalavra = () => {
  cleanElement("#cardPalavra");
  const replace = arrayPalavra.map(
    (caractere) => (caractere = validateCaractere(caractere))
  );

  letterIndexInWord.map(({ indice, letra }) => (replace[indice] = letra));

  replace.map((caractere) => showLetterInWord(caractere));
};

export const existeNaPalavra = (e) => {
  const letra = e.target.id;
  const letterRepeted = verifyLetterInWord(letra, letrasEscolhidas);

  if (letterRepeted) {
    return;
  }

  letrasEscolhidas.push(letra);
  showChoisenLetter(letrasEscolhidas);

  if (quantidadeErros == 6) {
    return messageEndGame(ListarPais, nomePais);
  }

  const verify = verifyLetterInWord(letra, arrayPalavra);

  if (!verify) {
    quantidadeErros = quantidadeErros + 1;
    changeHangmanImage(quantidadeErros);
    return;
  }

  arrayPalavra.filter(
    (letterWord, index) =>
      letterWord == letra &&
      letterIndexInWord.push({ indice: index, letra: letra })
  );

  letrasDaPalavra.push(letra);
  formarPalavra();
};

const palavraGerada = (json) => {
  let arrayNomePais = json.map((obj) => obj.nome);

  let numero = Math.floor(Math.random() * arrayNomePais.length + 1);

  nomePais = arrayNomePais
    .filter((_item, index) => index === numero)
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();

  arrayPalavra = nomePais.split("");

  arrayPalavra.map((letra) => replaceWordWithUnderline(letra));
};

document.addEventListener("DOMContentLoaded", listAlphabet);
document.addEventListener("DOMContentLoaded", ListarPais);
document
  .getElementById("btnPalavraAleatoria")
  .addEventListener("click", ListarPais);
