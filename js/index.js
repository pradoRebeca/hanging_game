import { showElement } from "./utils/connectionElements.js";
import { themes } from "./utils/lists.js";

const listThemesView = () => {
  const configElement = {
    element: "#card-theme",
    classStyle: "titleTheme",
    functionClick: setGameTheme,
  };

  themes.map((item) =>
  showElement({ ...configElement, content: item.name, id: item.id })
  );
};

export const setGameTheme = (e) => {
  const idTheme = e.target.id;
  window.location.href = `play.html?theme=${idTheme}`;
};

document.addEventListener("DOMContentLoaded", listThemesView);
