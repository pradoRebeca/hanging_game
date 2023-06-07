export function messageEndGame(startNewGame, word) {
  swal("Derrotado?", {
    buttons: {
      jogo: {
        text: "Novo Jogo",
        value: "new_game",
      },
      palavra: {
        text: "Mostrar Palavra",
        value: "show_word",
      },
    },
  }).then((value) => {
    if (value == "new_game") {
      return startNewGame();
    }

    if (value == "show_word") {
      return swal("A palavra era:", word);
    }
  });
}

export function messageWinnerGame() {
  swal({
    title: "Parabéns!!" ,
    text: "Você acertou mais uma palavra!" ,
  });

}

export function messageError() {
  swal({
    title: "Ops, Algo deu errado" ,
    text: "Volte para home e tente novamente" ,
    icon: "error",
  });
}