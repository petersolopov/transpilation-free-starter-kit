import { useMemo } from "preact/hooks";

/**
 * @typedef {import('jss').StyleSheet} StyleSheet
 * @typedef {import('jss').Classes} Classes
 * @type {(sheet: StyleSheet) => Classes}
 */
export function useStyles(sheet) {
  useMemo(() => {
    sheet.attach();
  }, [sheet]);

  return sheet.classes;
}
