export async function requestAPI() {
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/paises?orderBy=nome`;
  const options = {
    method: "GET",
  };

  return await fetch(url, options)
    .then((resp) => resp.json())
    .then((json) => ({ status: "sucess", payload: json }))
    .catch((error) => ({ status: "error", payload: error }));
}
