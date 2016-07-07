import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'

import App from './App'

const rootElement = document.getElementById('root')

ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  rootElement
)

if (module.hot) {
  module.hot.accept('./App', () => {
    ReactDOM.render(
      <AppContainer>
        <App />
      </AppContainer>,
      rootElement
    )
  })
}
