import jsdom from 'jsdom'

export const setupDom = () => {
  if (typeof document !== 'undefined') {
    return
  }

  global.document = jsdom.jsdom('<html><body></body></html>')
  global.window = document.defaultView
  global.navigator = window.navigator
}
