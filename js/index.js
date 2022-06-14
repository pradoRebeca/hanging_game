"use strict";
console.log("INDEXJS");

const limparElementos = (nameEmelemto) => {
  const elemento = document.querySelector(nameEmelemto);
  while (elemento.firstChild) {
    elemento.removeChild(elemento.lastChild);
  }
};

const ListarPais = async () => {
  limparElementos("#cardPalavra");
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
  const letter = [
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

  return letter.map((item) => exibirAlfabeto(item));
};

const exibirAlfabeto = (letra) => {
  const container = document.querySelector("#cardLetra");
  const div = document.createElement("div");

  div.classList.add("letras");
  div.id = letra;
  div.innerHTML = letra;
  div.onclick = existeNaPalavra;

  container.appendChild(div);
};

const substituirPalavraUnderline = () => {
  const container = document.querySelector("#cardPalavra");
  const div = document.createElement("p");

  div.classList.add("caractere");
  div.innerHTML = "_";

  container.appendChild(div);
};

let arrayPalavra;

let posicaoLetra = [];

let letrasDaPalavra = [];

let replace = [];
var indices = [];

const formarPalavra = () => {
  limparElementos("#cardPalavra");
  const replace = arrayPalavra.map((caractere) => (caractere = "_"));
  indices.map(({ indice, letra }) => (replace[indice] = letra));

  replace.map((caractere) => exibirLetraDaPalavra(caractere));
};

const exibirLetraDaPalavra = (letra) => {
  const container = document.querySelector("#cardPalavra");
  const div = document.createElement("p");

  div.classList.add("caractere");
  div.innerHTML = letra;

  container.appendChild(div);
};

console.log(arrayPalavra);

const existeNaPalavra = (e) => {
  const letra = e.target.id;

  const verificar = arrayPalavra.filter(
    (item) => item == letra.toUpperCase() || item == letra.toLowerCase()
  );

  if (verificar.length != 0) {
    var idx = arrayPalavra.indexOf(verificar[0]);

    while (idx != -1) {
      indices.push({ indice: idx, letra: letra });
      // posicaoLetra.push({indice: idx, letra: letra})
      idx = arrayPalavra.indexOf(verificar[0], idx + 1);
    }

    console.log("indices =>", indices);
    letrasDaPalavra.push(letra);

    console.log("letrasDaPalavra", letrasDaPalavra);
    console.log(arrayPalavra);

    formarPalavra();
    // exibirLetraDaPalavra(letra, indices);

    // const exibirLetra = indices.map((item) => (replace[item] = letra));
  } else {
    console.log("tem essa letra não");
  }
};

function numeroAleatorio(max) {
  console.log(Math.floor(Math.random() * max + 1));
  return Math.floor(Math.random() * max + 1);
}

const palavraGerada = (json) => {
  let arrayNomePais = json.map((obj) => obj.nome);

  let numero = numeroAleatorio(arrayNomePais.length);

  let nomePais = arrayNomePais
    .filter((_item, index) => index === numero)
    .toString().normalize("NFD");




  arrayPalavra = nomePais.split("");

  arrayPalavra = arrayPalavra.map((item) => item.toUpperCase());

  arrayPalavra.map((letra) => substituirPalavraUnderline(letra));

  // pais.map((item) => (item == ' ' || item == '-') ? exibirPalavra('-') : exibirPalavra());
};

document
  .getElementById("btnPalavraAleatoria")
  .addEventListener("click", ListarPais);
document.addEventListener("DOMContentLoaded", listAlphabet);
document.addEventListener("DOMContentLoaded", ListarPais);
