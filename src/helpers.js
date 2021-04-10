import { html } from "htm/preact";
import { useState, useEffect } from "preact/hooks";

/**
 * @template T
 * @param {() => Promise<{default: import("preact").AnyComponent<T>}>} thunk
 * @return {import("preact").AnyComponent<T> }
 */
export function lazy(thunk) {
  return function LazyComponent(props) {
    const [Component, setComponent] = useState(null);
    useEffect(() => {
      thunk().then((module) => {
        // @ts-ignore
        setComponent(() => module.default);
      });
    }, [setComponent]);

    if (!Component) return null;

    return html`<${Component} ...${props} />`;
  };
}

let styleId = 0;
/**
 * @typedef {{[key: string]: string}} Sheet
 * @type {(sheet: Sheet) => Sheet }
 */
export function useStyles(sheet) {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = sheet.toString();
    const id = `j2s-${styleId++}`;
    style.id = id;
    if (!document.getElementById(id)) {
      document.getElementsByTagName("head")[0]?.appendChild(style);
    }
  }, [sheet]);

  return sheet;
}
