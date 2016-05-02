# extendo clip

## Installation

```bash
# clone it
$ npm install
```

## Development

* Run script
```bash
# build files to './dev'
# start WebpackDevServer
$ npm run dev
```
* Allow `https://localhost:3000` connections. (Because `injectpage` injected GitHub (https) pages, so `webpack-dev-server` procotol must be https.)
* [Load unpacked extensions](https://developer.chrome.com/extensions/getstarted#unpacked) with `./dev` folder.

#### React/Redux hot reload

This boilerplate uses `Webpack` and `react-transform`, and use `Redux`. You can hot reload by editing related files of Popup & Window & Inject page.

#### Using Redux DevTools Extension

You can use [redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension) on development mode.

## Build

```bash
# build files to './build'
$ npm run build
```

## Compress

```bash
# compress build folder to {manifest.name}.zip and crx
$ npm run build
$ npm run compress -- [options]
```
