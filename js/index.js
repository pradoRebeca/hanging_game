"use strict";
console.log("INDEXJS");

const limparElementos = (nameEmelemto) => {
  const elemento = document.querySelector(nameEmelemto);
  while (elemento.firstChild) {
    elemento.removeChild(elemento.lastChild);
  }
};

let arrayPalavra;

let posicaoLetra = [];

let letrasDaPalavra = [];
let letrasEscolhidas = [];
let replace = [];
var indices = [];
let quantidadeErros = 0;

const ListarPais = async () => {
  letrasDaPalavra = [];
  replace = [];
  indices = [];
  letrasEscolhidas = [];
  quantidadeErros = 0;
  limparElementos("#cardLetrasEscolhidas");
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

const exibirLetrasEscolhidas = () => {
  const container = document.querySelector("#cardLetrasEscolhidas");
  const p = document.createElement("p");

  p.classList.add("letrasEscolhidas");

  if (letrasEscolhidas.length != 0) {
    letrasEscolhidas.map((letra) => (p.innerHTML = letra));
    container.appendChild(p);
  }
};

const validacao = (caractere) => {
  if (caractere == "-" || caractere == "(" || caractere == ")") {
    return caractere;
  } else if (caractere == " ") {
    return "-";
  } else {
    return "_";
  }
};

const substituirPalavraUnderline = (letra) => {
  const container = document.querySelector("#cardPalavra");
  const div = document.createElement("p");
  let caractere = validacao(letra);

  div.classList.add("caractere");
  div.innerHTML = caractere;

  container.appendChild(div);
};

const formarPalavra = () => {
  limparElementos("#cardPalavra");
  const replace = arrayPalavra.map(
    (caractere) => (caractere = validacao(caractere))
  );

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

const trocarImagem = () => {
  const img = document.getElementById("imgPersonagem");

  switch (quantidadeErros) {
    case 1:
      img.src = "../img/cabeca.png";
      break;
    case 2:
      img.src = "../img/tronco.png";

      break;
    case 3:
      img.src = "../img/bracoDireito.png";

      break;
    case 4:
      img.src = "../img/bracoEsquerdo.png";
      break;
    case 5:
      img.src = "../img/pernaDireita.png";
      break;
    case 6:
      img.src = "../img/corpoMontado.png";
      break;
  }
};

const existeNaPalavra = (e) => {
  const letra = e.target.id;

  letrasEscolhidas.push(letra);

  const quantiadadeRepeticoes = letrasEscolhidas.filter(
    (item) => item == letra
  );

  if (quantidadeErros <6) {
    if (quantiadadeRepeticoes.length < 2) {
      exibirLetrasEscolhidas();

      const verificar = arrayPalavra.filter(
        (item) => item == letra.toUpperCase() || item == letra.toLowerCase()
      );

      if (verificar.length != 0) {
        var idx = arrayPalavra.indexOf(verificar[0]);

        while (idx != -1) {
          indices.push({ indice: idx, letra: letra });
          idx = arrayPalavra.indexOf(verificar[0], idx + 1);
        }

        letrasDaPalavra.push(letra);

        formarPalavra();
      } else {
        quantidadeErros = quantidadeErros + 1;
        trocarImagem();
        console.log("tem essa letra não");
      }
    }
  } else {
    swal({
      title: "Derrotado",
      text: "Calma amigo, uma hora você consegue (eu acho)",
      button: "Aceitar Derrota",
    });
    console.log("perdeu otario");
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
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();

  arrayPalavra = nomePais.split("");

  console.log("arrayPalavra => ", arrayPalavra);
  arrayPalavra.map((letra) => substituirPalavraUnderline(letra));
};

document
  .getElementById("btnPalavraAleatoria")
  .addEventListener("click", ListarPais);
document.addEventListener("DOMContentLoaded", listAlphabet);
document.addEventListener("DOMContentLoaded", ListarPais);
