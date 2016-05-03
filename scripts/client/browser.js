// cuter console.logs
function log (str, color) {
  var colors = {
    'twitter': '#1da1f2',
    'success': '#228b22',
    'error': '#DC143C'
  }

  console.log(
    '%c' + str,
    'background: ' +
    (colors[color] || '#000') +
    '; color: #FFF; font-size: 12px; font-weight: bold; padding: 3px;'
  )
  console.log('')
}

function redirect(url, opts) {
  log('REDIRECTING ', 'success')
  var newUrl = opts.append ? (window.location.href + '/') : ''
  newUrl += url

  window.location.href = newUrl
}

function login(credentials) {
  log('LOGGING IN ', 'twitter')
  if ($('.js-login').length) {
    $('.js-login')[0].click()
  }
  $('.js-signin-email').val(function () {
    return credentials.u
  })
  $('.LoginForm-password input').val(function () {
    return credentials.p
  })
  $('.js-submit')[0].click()
}

function createApp(appInfo) {
  log('CREATING NEW APP ', 'success')
  $('input#edit-name').val(function () {
    return appInfo.name
  })

  $('input#edit-description').val(function () {
    return appInfo.desc
  })

  $('input#edit-url').val(function () {
    return appInfo.site
  })

  $('input#edit-tos-agreement').prop('checked', true)

  setTimeout(function() {
    $('input#edit-submit')[0].click()
  }, 500)
}

function createTokens() {
  log('CREATING TOKENS', 'success')
  $('input#edit-submit-owner-token')[0].click()
}

function copyCreds() {
  log('COPYING CREDENTIALS ..', 'success')
  var creds = {}
  $('.heading').each(function() {
    switch ($(this).text()) {
      case 'Consumer Key (API Key)':
        creds.ckey = $(this).next().text()
        break
      case 'Consumer Secret (API Secret)':
        creds.csecret = $(this).next().text()
        break
      case 'Access Token':
        creds.atoken = $(this).next().text()
        break
      case 'Access Token Secret':
        creds.asecret = $(this).next().text()
        break
    }
  })

  var input = document.createElement('input')
  input.setAttribute('type', 'text')

  input.value = JSON.stringify(creds)
  document.body.appendChild(input)

  input.select()
  document.execCommand('copy')
  log('COPIED CREDENTIALS', 'success')
}

function setUpListeners() {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var fnMap = {
      'login': login,
      'redirect': redirect,
      'createApp': createApp,
      'createTokens': createTokens,
      'copyCreds': copyCreds
    }

    log('ON MESSAGE', 'success')
    console.log(request.fn)
    console.log(request.args)
    var args = request.args.concat([sendResponse])
    fnMap[request.fn].apply(null, args)

    if (sendResponse) {
      sendResponse()
    }

    return true
  })
}

$(document).ready(function() {
  log('TWITTER APP CREATOR READY!', 'twitter')
  setUpListeners()
})
