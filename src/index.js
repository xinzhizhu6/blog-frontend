import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/styles/preset.scss'
// import 'antd/dist/antd.css';
import 'antd/dist/reset.css';
import { BrowserRouter } from 'react-router-dom';
import { GlobalLoading } from './components/base'
import './common/i18n'
import { Provider } from 'react-redux'
import config from './config'
import store from "./store"

ReactDOM.render(
  // <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/blog">
        <React.Suspense fallback={<GlobalLoading />} maxDuration={config.LOADING_DELAY}>
          <App />
        </React.Suspense>
      </BrowserRouter>
    </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

