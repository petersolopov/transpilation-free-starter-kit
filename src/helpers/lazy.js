import { useEffect, useState } from "preact/hooks";
import { html } from "htm/preact";

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
