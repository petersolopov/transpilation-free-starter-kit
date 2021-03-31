import {
  h,
  render,
} from "https://unpkg.com/preact@10.5.13/dist/preact.module.js";
import htm from "https://unpkg.com/htm@3.0.4/dist/htm.module.js";

const html = htm.bind(h);

const App = ({ name }) => {
  return html`<div>Hello ${name}</div>`;
};

function renderApp() {
  const element = document.getElementById("app");

  render(html`<${App} name="world" />`, element);
}

renderApp();
