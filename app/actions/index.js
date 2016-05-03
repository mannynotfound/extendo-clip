export default [
  {
    label: 'Login',
    fn: 'login',
    args: [
      {
        u: 'username',
        p: 'password',
      }
    ],
  },
  {
    label: 'New App',
    fn: 'redirect',
    waitFor: 'https://twitter.com/',
    args: [
      'https://apps.twitter.com/app/new',
      { append: false }
    ],
  },
  {
    label: 'Create App',
    fn: 'createApp',
    waitFor: 'https://apps.twitter.com/app/new',
    args: [
      {
        name: 'App Name',
        desc: 'App Desc',
        site: 'http://appsite.com',
      }
    ],
  },
  {
    label: 'Go To Keys',
    fn: 'redirect',
    waitFor: 'https://apps.twitter.com/app',
    args: [
      'keys',
      { append: true }
    ],
  },
  {
    label: 'Create Tokens',
    waitFor: 'https://apps.twitter.com/app',
    fn: 'createTokens',
    args: [],
  },
  {
    label: 'Copy Credentials',
    waitFor: 'https://apps.twitter.com/app',
    fn: 'copyCreds',
    args: [],
  }
]
