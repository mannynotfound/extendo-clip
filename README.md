# extendo clip

A nodejs, react, es6 based chrome extension for browser automation.

## Notes

Experimental chrome extension I made while exploring browser automation solutions. I've since decided to build this service with [Selenium](http://www.seleniumhq.org/) for ease and speed of development (talking between extension and the browser is a bitch).

This extension exploits [twitter.com](https://twitter.com) to automatically login, create a a new developer account and then copy the credentials to your clipboard.

## Usage

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

