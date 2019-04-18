import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import reducer from './reducers'
import './index.css';
import App from './modules/App';
import * as serviceWorker from './serviceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
    display: 'board',
    score: 0,
    categories: [
        { id: 0, title: ''},
        { id: 0, title: ''},
        { id: 0, title: ''},
        { id: 0, title: ''},
        { id: 0, title: ''}
    ],
    numCategories: 0,
    usedCategories: [],
    usedSquareKeys: [],
    dailyDoubles: [],
    wager: 0,
    currentClue: null,
    multiplier: 100,
    round: 0,
    answerSubmitted: false,
    isAnswerCorrect: false
  };
  
const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(promise))
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
