import { html, render } from "htm/preact";
import { Router, Route } from "preact-router";
import history from "./history.js";

import { lazy } from "./helpers.js";
import Menu from "./Menu.js";

const AboutPageLazy = lazy(() => import("./About.js"));

/** @type {import('preact').FunctionComponent<{ name: string }>} */
const HomePage = ({ name }) => {
  return html`<div>${name} page</div>`;
};

function App() {
  return html`
    <${Menu}/>
    <${Router} history=${history.createHashHistory()}>
      <${Route} default component=${() => html`<${HomePage} name="Home" />`} />
      <${Route} path="/about" component=${AboutPageLazy} />
    </Router>
  `;
}

function renderApp() {
  const element = document.getElementById("app");

  if (!element) throw new Error("element is not found");

  render(html`<${App} />`, element);
}

renderApp();
