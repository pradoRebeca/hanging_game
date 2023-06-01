import { validateResponseAPI } from "./utils/utils.js";

export async function requestAPI(url) {
  const options = {
    method: "GET",
  };

  return await fetch(url, options)
    .then((resp) => resp.json())
    .then((json) => ({ status: "sucess", payload: validateResponseAPI(json) }))
    .catch((error) => ({ status: "error", payload: error }));
}
