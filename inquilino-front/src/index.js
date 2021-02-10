import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux';
import loginReducer from './Store/loginReducer';
import registerReducer from './Store/registerReducer'
import ErrorBoundary from './ErrorBoundary';


const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer
})

const store = createStore(rootReducer)

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
