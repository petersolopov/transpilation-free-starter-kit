import { html } from "htm/preact";
import j2c from "j2c";
import { useStyles } from "../helpers/useStyles.js";

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

const sheet = j2c.sheet({
  ".ui": {
    listStyle: "none",
    padding: 0,
    display: "flex",
  },
  ".li": {
    paddingRight: "4px",
  },
});

export default Menu;
