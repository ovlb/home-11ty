import { skipLinkControl } from './modules/skipLinkControl.js'
import { themeSwitchControl } from './modules/themeSwitch.js'

function init() {
  requestAnimationFrame(() => {
    skipLinkControl()
    themeSwitchControl()
  })
}

if (document.readyState === 'complete') {
  init()
} else {
  window.addEventListener('load', () => {
    init()
  })
}
