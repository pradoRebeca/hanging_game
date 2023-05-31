import { themes } from "./api.js";
import { showThemes } from "./utils/connectionElements.js";

import { listThemes } from "./utils/utils.js";

console.log("home");

const listThemesView = () => {
  const arrayThemes = listThemes();

  arrayThemes.map((theme) => showThemes(theme));
};

export const setGameTheme = (e) => {
  const nameTheme = e.target.id;
console.log("nameTheme", nameTheme)
  window.location.href = `index.html?theme=${nameTheme}`;
};

document.addEventListener("DOMContentLoaded", listThemesView);
