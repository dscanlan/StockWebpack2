import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import App from './components/App';
import Login from './components/Login';
import Logout from './components/Logout';
import RequireAuth from './components/RequireAuth';
import Feature from './components/Feature';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

// thunk action creator, needs redux-thunk
function listenToWindowEvent(name, mapEventToAction, filter = (e) => true) {
  return function (dispatch) {
    function handleEvent(e) {
      if (filter(e)) {
        dispatch(mapEventToAction(e));
      }
    }

    window.addEventListener(name, handleEvent);

    // note: returns a function to unsubscribe
    return () => window.removeEventListener(name, handleEvent);
  };
}

// turns DOM event into action,
// you can define many of those
function navigatorOnLine(e) {
  return {
    type: 'WEB_APP_ONLINE',
    payload: navigator.onLine
  };
}

// subscribe to event
let onLoadListen = store.dispatch(listenToWindowEvent('load', navigatorOnLine));
let onLineListen = store.dispatch(listenToWindowEvent('offline', navigatorOnLine));
let offLineListen = store.dispatch(listenToWindowEvent('online', navigatorOnLine));
// eventually unsubscribe
//unlistenKeyPress();

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} >
      <Route path="/" component={App}>
        <IndexRoute component={Login} />
        <Route path="Login" component={Login} />
        <Route path="Logout" component={Logout} />
        <Route path="Feature" component={RequireAuth(Feature)} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
