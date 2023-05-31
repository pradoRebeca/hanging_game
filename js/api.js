export const themes = {
  pokemon: {
    name: "Pokemon",
    url: "https://pokeapi.co/api/v2/pokemon",
  },
  pais: {
    name: "País",
    url: "https://servicodados.ibge.gov.br/api/v1/localidades/paises?orderBy=nome",
  },
  rickAnMorty: {
    name: "Rick and Morty",
    url: "https://rickandmortyapi.com/api/character",
  },
  starWars: {
    name: "Star Wars",
    url: "https://swapi.dev/api/people/1",
  },
};

export async function requestAPI(url) {
  const options = {
    method: "GET",
  };

  return await fetch(url, options)
    .then((resp) => resp.json())
    .then((json) => ({ status: "sucess", payload: json }))
    .catch((error) => ({ status: "error", payload: error }));
}
