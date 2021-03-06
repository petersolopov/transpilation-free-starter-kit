import { html, render } from "htm/preact";
import { Router, Route } from "preact-router";

import history from "./helpers/history.js";
import { lazy } from "./helpers/lazy.js";
import Menu from "./components/Menu.js";
import HomePage from "./pages/HomePage.js";

const AboutPageLazy = lazy(() => import("./pages/AboutPage.js"));

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
