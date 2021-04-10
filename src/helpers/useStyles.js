import { useEffect } from "preact/hooks";

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
