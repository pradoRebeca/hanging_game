export const alphabet = [
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

export const nameImages = [
  "forca.png",
  "cabeca.png",
  "tronco.png",
  "bracoDireito.png",
  "bracoEsquerdo.png",
  "pernaDireita.png",
  "pernaEsquerda.png",
];

export function validateCaractere(caractere) {
  if (caractere == "-" || caractere == "(" || caractere == ")") {
    return caractere;
  } else if (caractere == " ") {
    return "-";
  } else {
    return "_";
  }
}

export function verifyLetterInWord(letter, arrayWord) {
  const verify = arrayWord.filter(
    (item) => item == letter.toUpperCase() || item == letter.toLowerCase()
  );

  if (verify.length > 0) {
    return verify;
  }

  return false;
}
