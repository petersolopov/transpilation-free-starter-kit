import {
  html,
  render,
} from "https://unpkg.com/htm@3.0.2/preact/standalone.module.js";

/** @type {import('preact').FunctionalComponent<{name: string}>} */
const App = ({ name }) => {
  return html`<div>Hello ${name}</div>`;
};

function renderApp() {
  const element = document.getElementById("app");

  if (!element) throw new Error("element is not found");

  render(html`<${App} name="world" />`, element);
}

renderApp();
