# transpilation-free-starter-kit

This repo contains an example of how to create an application with jsx-like syntax and type checking without transpilation.

## Features

- No build step for development
- Static typing via TypeScript
- Looks like React application
- Can build for IE11 and all modern browsers

## Getting Starting

Clone the repo, install dependencies and start a static server:

```bash
git clone -o template -b main --single-branch git@github.com:petersolopov/transpilation-free-starter-kit.git my-app
cd my-app
npm install
npm run serve
```

## How It Works

- It uses [htm](https://github.com/developit/htm) for jsx-like syntax.
- Control javascript imports with [import-maps](https://github.com/wicg/import-maps)
- [es-module-shims](https://github.com/guybedford/es-module-shims) for browsers that do not support import maps.
- Type checking javascript files with [typescript + jsdocs](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html).

## Restrictions

- Dependencies should be ES modules
- Type checking in tagged templates (work in progress)
- Trailing slashes in import maps not properly support when building app (work in progress)

## Building App

You should build your app once for production:

```
npm run build
```

[93% of users](https://caniuse.com/es6-module) are now running browsers with support for ES modules. That's why it creates two versions of the app: ES6 modules for modern browsers and SystemJS modules for legacy browsers.

Built code does not contain import maps and es-modules-shims.

**Supports**: IE11 and all modern browsers.

## LICENSE

[MIT](/LICENSE)
