import { nameImages } from "./lists.js";

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

export function showElement({
  element,
  classStyle,
  content,
  id,
  functionClick,
}) {
  const container = document.querySelector(element);
  const div = document.createElement("div");

  div.classList.add(classStyle);
  div.id = id;
  div.innerHTML = content;

  if (functionClick) {
    div.onclick = functionClick;
  }

  container.appendChild(div);
}

export function cleanElement(elementName) {
  let arrayElementName = elementName;

  if (!Array.isArray(elementName)) {
    arrayElementName = [elementName];
  }

  for (let item of arrayElementName) {
    const element = document.querySelector(item);

    while (element?.firstChild) {
      element.removeChild(element.lastChild);
    }
  }
}

export function changeHangmanImage(amountErrors) {
  const img = document.getElementById("imgPersonagem");

  if (!img) {
    return;
  }

  const image = nameImages.filter((_image, index) => index == amountErrors)[0];
  img.src = `./img/${image}`;
}
