import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from './stores/configureStore';
import {Provider} from 'react-redux';
import { CookiesProvider } from 'react-cookie';
// import './vendor/Skeleton-2.0.4/css/normalize.css';
// import './vendor/Skeleton-2.0.4/css/skeleton.css';

const store = configureStore();

const startApp = () => {
  ReactDOM.render(
    <CookiesProvider>
      <Provider store={store}>
        <App/>
      </Provider>
    </CookiesProvider>,
    document.getElementById('root'));
}
// If you   want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

if (window.cordova) {
  document.addEventListener('deviceready', startApp, false);
} else {
  startApp();
};
