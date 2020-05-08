import { skipLinkControl } from './modules/skipLinkControl.js'
import { themeSwitchControl } from './modules/themeSwitch.js'

if (document.readyState === 'complete') {
  skipLinkControl()
  themeSwitchControl()
} else {
  window.addEventListener('load', () => {
    requestAnimationFrame(() => {
      skipLinkControl()
      themeSwitchControl()
    })
  })
}
