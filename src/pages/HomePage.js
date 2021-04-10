import { html } from "htm/preact";

/** @type {import('preact').FunctionComponent<{ name: string }>} */
const HomePage = ({ name }) => {
  return html`<div>${name} page</div>`;
};

export default HomePage;
