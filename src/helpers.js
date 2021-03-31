// @ts-nocheck
import { html } from "htm/preact";
import { useState, useEffect } from "preact/hooks";

export function lazy(thunk) {
  return function LazyComponent(props) {
    const [Component, setComponent] = useState(null);
    useEffect(() => {
      thunk().then((module) => {
        setComponent(() => module.default);
      });
    }, [setComponent]);

    if (!Component) return null;

    return html`<${Component} ...${props} />`;
  };
}

let styleId = 0;
export function useStyles(sheet) {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = sheet.toString();
    const id = `j2s-${styleId++}`;
    style.id = id;
    if (!document.getElementById(id)) {
      document.getElementsByTagName("head")[0]?.appendChild(style);
    }
  }, sheet);

  return sheet;
}
