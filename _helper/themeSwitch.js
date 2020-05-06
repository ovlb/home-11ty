;(function () {
  const $switchContainer = document.querySelector('.js-theme-switch')
  const $switchButton = $switchContainer.querySelector('button')
  const userThemeSetting = localStorage.getItem('ovlUserTheme')
  /**
   * @type Boolean
   */
  let isDarkMode

  if (userThemeSetting) {
    const userSettingPrefersDark = userThemeSetting === 'dark'

    isDarkMode = userSettingPrefersDark
    document.documentElement.setAttribute('data-user-theme', userThemeSetting)
  } else {
    const isDark = matchMedia('(prefers-color-scheme: dark)').matches

    isDarkMode = isDark
  }

  $switchButton.setAttribute('aria-checked', isDarkMode.toString())

  $switchContainer.addEventListener('click', function () {
    isDarkMode = !isDarkMode

    const theme = isDarkMode ? 'dark' : 'light'

    localStorage.setItem('ovlUserTheme', theme)

    $switchButton.setAttribute('aria-checked', isDarkMode.toString())

    document.documentElement.setAttribute('data-user-theme', theme)
  })

  $switchContainer.hidden = false
})()
