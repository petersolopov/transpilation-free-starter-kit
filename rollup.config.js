import { babel } from "@rollup/plugin-babel";
import analyze from "rollup-plugin-analyzer";
import { terser } from "rollup-plugin-terser";
import fs from "fs";

const htmlString = fs.readFileSync("./index.html", { encoding: "utf8" });

const exec = /<script type="importmap">([\s\S]*?)<\/script>/g.exec(htmlString);
const importMaps = JSON.parse(exec[1]);

const importMapsPlugin = () => ({
  resolveId(source) {
    if (source in importMaps.imports) {
      return importMaps.imports[source];
    }
    return null;
  },
});

export default [
  {
    input: "src/init.js",
    preserveEntrySignatures: "strict",
    plugins: [
      analyze({ summaryOnly: true }),
      importMapsPlugin(),
      terser(),
      babel({
        babelHelpers: "bundled",
        presets: [
          ["@babel/preset-env", { targets: ["defaults", "not ie 11"] }],
        ],
        plugins: [
          "@babel/plugin-proposal-class-properties",
          ["babel-plugin-htm", { import: "preact" }],
        ],
      }),
    ],
    output: [
      {
        dir: "rollup-build/js/es",
        format: "es",
        sourcemap: true,
      },
    ],
  },
  {
    input: "src/init.js",
    preserveEntrySignatures: "strict",
    plugins: [
      importMapsPlugin(),
      babel({
        babelHelpers: "bundled",
        presets: [["@babel/preset-env", { targets: { ie: "11" } }]],
        plugins: [
          "@babel/plugin-proposal-class-properties",
          ["babel-plugin-htm", { import: "preact" }],
        ],
      }),
      terser(),
    ],
    output: [
      {
        dir: "rollup-build/js/system",
        format: "system",
        sourcemap: true,
      },
    ],
  },
];
