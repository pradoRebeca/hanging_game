import { existeNaPalavra } from "../index.js";
import { nameImages } from "./utils.js";

export function showChoisenLetter(choisenLetter) {
  const container = document.querySelector("#cardLetrasEscolhidas");
  const p = document.createElement("p");

  p.classList.add("letrasEscolhidas");

  if (choisenLetter.length != 0) {
    choisenLetter.map((letter) => (p.innerHTML = letter));
    container.appendChild(p);
  }
}

export function changeElementCaractere(letter) {
  const container = document.querySelector("#cardPalavra");
  const div = document.createElement("p");

  div.classList.add("caractere");
  div.innerHTML = letter;

  container.appendChild(div);
}

export function showAlphabet(letter) {
  const container = document.querySelector("#cardLetra");
  const div = document.createElement("div");

  div.classList.add("letras");
  div.id = letter;
  div.innerHTML = letter;
  div.onclick = existeNaPalavra;

  container.appendChild(div);
}

export function cleanElement(elementName) {
  const elemento = document.querySelector(elementName);
  while (elemento.firstChild) {
    elemento.removeChild(elemento.lastChild);
  }
}

export function changeHangmanImage(amountErrors) {
  const img = document.getElementById("imgPersonagem");
  const image = nameImages.filter((_image, index) => index == amountErrors)[0];

  img.src = `../img/${image}`;
}
