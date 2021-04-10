import path from "path";
import { rollup } from "rollup";
import fs from "fs";
import copydir from "copy-dir";

const buildDir = "rollup-build";
const __dirname = path.resolve();

import rollupOptions from "../rollup.config.js";

async function removeBuildDir() {
  fs.rmdirSync(path.resolve(__dirname, `./${buildDir}`), {
    recursive: true,
  });
}

async function copyPublicDir() {
  copydir.sync(
    path.resolve(__dirname, "./public/"),
    path.resolve(__dirname, `./${buildDir}/public/`)
  );
}

// running rollup through js api, not cli. See docs
// see https://rollupjs.org/guide/en/#programmatically-loading-a-config-file
async function buildJS() {
  for (const optionsObj of rollupOptions) {
    const bundle = await rollup(optionsObj);
    await Promise.all(optionsObj.output.map(bundle.write));
  }
}

async function copyHTML() {
  const htmlString = fs.readFileSync(path.resolve(__dirname, "./index.html"), {
    encoding: "utf-8",
  });
  const originScriptSrc = "/index.js";
  const timeStamp = Date.now();

  const htmlInitScript = `
    <script src="//polyfill.io/v3/polyfill.min.js"></script>
    <script src="public/regenerator-runtime.js"></script>

    <script>
      import("/js/es/index.js?${timeStamp}");
      window.supportsDynamicImport = true;
    </script>
    <script>
      if (!window.supportsDynamicImport) {
        var systemJsLoaderTag = document.createElement('script');
        systemJsLoaderTag.src = 'public/s.min.js';
        systemJsLoaderTag.addEventListener('load', function () {
          window.System.import('/js/system/index.js?${timeStamp}');
        });
        document.head.appendChild(systemJsLoaderTag);
      }
    </script>`;

  const exec = /<script type="importmap">([\s\S]*?)<\/script>/g.exec(
    htmlString
  );

  const template = htmlString
    .replace(exec[0], "")
    .split("\n")
    .map((line) => {
      if (line.includes(originScriptSrc)) {
        return htmlInitScript;
      }
      return line;
    })
    .join("\n");

  fs.writeFileSync(
    path.resolve(__dirname, `./${buildDir}/index.html`),
    template
  );
}

async function build() {
  await removeBuildDir();
  await buildJS();
  await copyHTML();
  await copyPublicDir();
}

build();
