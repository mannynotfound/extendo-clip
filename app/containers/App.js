import React, {Component, PropTypes} from 'react'
import Command from '../components/Command'
import style from './App.css'

const actions = [
  {
    label: 'Login',
    fn: 'login',
    args: [
      {
        u: 'some user',
        p: 'some pass',
      }
    ],
  },
  {
    label: 'New App',
    fn: 'redirect',
    args: [
      'https://apps.twitter.com/app/new',
      { append: false }
    ],
  },
  {
    label: 'Create App',
    fn: 'createApp',
    args: [
      {
        name: 'some app name',
        desc: 'some app desc',
        site: 'some app site',
      }
    ],
  },
  {
    label: 'Go To Keys',
    fn: 'redirect',
    args: [
      'keys',
      { append: true }
    ],
  },
  {
    label: 'Create Tokens',
    fn: 'createTokens',
    args: [],
  },
  {
    label: 'Copy Credentials',
    fn: 'copyCreds',
    args: [],
  }
]

function createTrigger(fn, args) {
  return function() {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      const tab = tabs[0].id
      chrome.tabs.sendMessage(tab, {fn, args}, () => {
        console.log('SENT MESSAGE ', fn)
      })
    })
  }
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className={style.normal}>
        {actions.map((a, i) => (
          <Command
            key={i}
            text={a.label}
            fn={createTrigger(a.fn, a.args)} />
        ))}
      </div>
    )
  }
}
