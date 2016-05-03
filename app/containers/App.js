import React, {Component, PropTypes} from 'react'
import Command from '../components/Command'
import style from './App.css'
import actions from '../actions'

function once(fn) {
  return function() {
    if (fn === null) return;
    fn.apply(this, arguments);
    fn = null;
  };
}

function wait(url, fn) {
  if (!url) {
    return fn()
  }

  let gotTitle = false

  chrome.tabs.onUpdated.addListener(function(id, change, state) {
    if (change.title) {
      gotTitle = true
    }

    if (change.status === 'complete' && state.url.indexOf(url) > -1 && gotTitle) {
      gotTitle = false
      once(setTimeout.bind(null, fn, 1000))()
    }
  })
}

function createTrigger(opts) {
  return once(function(cb) {
    console.log('FIRING TRIGGER ', opts, cb)
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      const tab = tabs[0].id
      chrome.tabs.sendMessage(tab, opts, cb)
    })
  })
}

function triggerAll() {
  let current = -1

  function trigger() {
    current++
    if (current > actions.length) {
      return
    }

    console.log('CREATING TRIGGER FOR ', actions[current])
    const {waitFor} = actions[current]
    const nextTrigger = createTrigger(actions[current]).bind(null, trigger)
    wait(waitFor, nextTrigger)
  }

  trigger()
}

export default class App extends Component {
  render() {
    return (
      <div className={style.normal}>
        <button onClick={triggerAll}>ALL</button>
        <br />
        <br />
        {actions.map((a, i) => (
          <Command
            key={i}
            text={a.label}
            fn={createTrigger(a)} />
        ))}
      </div>
    )
  }
}
