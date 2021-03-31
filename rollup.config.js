import urlResolve from "rollup-plugin-url-resolve";
import { babel } from "@rollup/plugin-babel";
import analyze from "rollup-plugin-analyzer";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "src/init.js",
    preserveEntrySignatures: "strict",
    plugins: [
      analyze({ summaryOnly: true }),
      urlResolve(),
      terser(),
      babel({
        babelHelpers: "bundled",
        presets: [
          ["@babel/preset-env", { targets: ["defaults", "not ie 11"] }],
        ],
        plugins: ["@babel/plugin-proposal-class-properties"],
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
      urlResolve(),
      babel({
        babelHelpers: "bundled",
        presets: [["@babel/preset-env", { targets: { ie: "11" } }]],
        plugins: ["@babel/plugin-proposal-class-properties"],
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
