# extendo clip

A nodejs, react, es6 based chrome extension for browser automation.

## Notes

currently just exploits [twitter.com](https://twitter.com) to automatically login, create a a new developer account and then copy the credentials to your clipboard.

total work in progress, the usage would be based off a config file (in this case  in `app/actions/index`)
eventually these actions would be redux actions that fire redux reducers that somehow would get run in the browser window. not sure if even need redux yet but it does
have browser cache state logic already implemented. right now each function in the actions config correlates to a function in `scripts/client/browser.js` and these are what actually
run in the browser based on interaction with the extension. this is nice because we can keep our app state maintained in a redux app environment, and then run jquery fuckery in the browser when needed.

## Usage

_work in progress_

```js
{
  label: 'Login', // human label for button in GUI
  fn: 'login', // fn name that corresponds with browser.js
  args: [ // args for the browser.js function
    {
      u: 'username',
      p: 'password',
    }
  ],
},
{
  label: 'New App',
  fn: 'redirect',
  waitFor: 'https://twitter.com/', // url to wait for before firing func, if ommitted will immediately fire
  args: [
    'https://apps.twitter.com/app/new',
    { append: false }
  ],
},
```

this config would login, wait for a browser change to a url (in this case twitter's homepage), and then fire the next function in the config when it detected the correct new url. 

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

## Todo

* make into an actual framework instead of case specific script
* refactor how url change detection works, its a buggy/unreliable mess rn
* design and implement proper GUI + inputting spreadsheets to load data from
* add good error handling / exit methods
* add keybindings
* research other solutions to see if this is worth developing srsly (doing it for fun rn)
