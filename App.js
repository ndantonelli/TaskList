import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'

import configureStore from './app/store/configureStore'
import App from './app/containers/'

const store = configureStore()

export default class extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}
