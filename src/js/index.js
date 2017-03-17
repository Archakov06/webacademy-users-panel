import React from 'react';
import { render } from 'react-dom'
import App from './containers/App'
import { Provider } from 'react-redux'
import configureStore from './store/index'

import '../styles/app.styl'
import 'react-select/dist/react-select.css'

const store = configureStore()

store.subscribe(() => {
  console.log('store', store.getState());
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
