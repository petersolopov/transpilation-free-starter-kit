import { html } from "htm/preact";
import { useStyles } from "../helpers/useStyles.js";
import jss from "jss";

const Menu = () => {
  const s = useStyles(sheet);

  return html`
    <ul class=${s.ui}>
      <li class=${s.li}>
        <a href="/">home</a>
      </li>
      <li class=${s.li}>
        <a href="/about">about</a>
      </li>
      <li class=${s.li}>
        <a
          href="https://github.com/petersolopov/transpilation-free-starter-kit"
        >
          github
        </a>
      </li>
    </ul>
  `;
};

const sheet = jss.createStyleSheet({
  ui: {
    "list-style": "none",
    padding: 0,
    display: "flex",
  },
  li: {
    "padding-right": "4px",
  },
});

export default Menu;
