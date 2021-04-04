import * as history from "history";

declare global {
  interface Window {
    HistoryLibrary: typeof history;
  }
}
