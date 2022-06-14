"use strict";
console.log("INDEXJS");

const limparElementos = (nameEmelemto) => {
  const elemento = document.querySelector(nameEmelemto);
  while (elemento.firstChild) {
    elemento.removeChild(elemento.lastChild);
  }
};

const ListarPais = async () => {
  limparElementos('#cardPalavra')
  const urlListar = `https://servicodados.ibge.gov.br/api/v1/localidades/paises?orderBy=nome`;
  const options = {
    method: "GET",
  };

  await fetch(urlListar, options)
    .then((resp) => resp.json())
    .then((json) => listaNomePais(json))
    .catch((err) => console.log(err));
};




const clickMe = () => {
 
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

  div.classList.add('letras')
  div.id = letra;
  div.innerHTML = letra;
  div.onclick = verificarLetraNomePais;

  container.appendChild(div);
};

const exibirPalavra = (caractere) => {
  const container = document.querySelector("#cardPalavra");
  const div = document.createElement("p");

  div.classList.add('caractere')
  div.innerHTML = caractere ?? '_';
  div.onclick = verificarLetraNomePais;

  container.appendChild(div);
};

// const exibirPaisEscolhido = (pais) => {
//   const container = document.querySelector("#cardPalavra");
//   const div = document.createElement("p");

//   div.innerHTML = pais;
  
//   container.appendChild(div);
// };



let pais;

function numeroAleatorio(max) {
  console.log(Math.floor(Math.random() * max + 1));
  return Math.floor(Math.random() * max + 1);
}

const listaNomePais = (json) => {
  let arrayNomePais = json.map((obj) => obj.nome);

  let numero = numeroAleatorio(arrayNomePais.length);

  let nomePais = arrayNomePais
    .filter((_item, index) => index === numero)
    .toString();

  pais = nomePais.split("");
  pais.map((item) => (item == ' ' || item == '-') ? exibirPalavra('-') : exibirPalavra());
};

console.log(pais)

const verificarLetraNomePais = (e) => {
  const replace = pais.map((item) => (item = "_"));
  const letra = e.target.id
  console.log('letra', letra)
  const vericar = pais.filter((item, index) => item == letra);

  if (vericar.length != 0) {
    var idx = pais.indexOf(vericar[0]);
    var indices = [];

    while (idx != -1) {
      indices.push(idx);
      idx = pais.indexOf(vericar[0], idx + 1);
    }

    const exibirLetra = indices.map((item) => (replace[item] = letra));

    let abc = pais.indexOf(vericar[0]);
    console.log(pais);
    console.log(replace);
    console.log('exiba', exibirLetra);
  } else {
    console.log("tem essa letra não");
  }
};

const exibirPais = () => {};

document
  .getElementById("btnPalavraAleatoria")
  .addEventListener("click", ListarPais);
  document.addEventListener("DOMContentLoaded", listAlphabet);
  document.addEventListener("DOMContentLoaded", ListarPais);