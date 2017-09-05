import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import {AsyncStorage} from 'react-native'
// Thunk middleware allows actions to be chained and waited on by returning
// a function from that action
// https://github.com/gaearon/redux-thunk
import thunk from 'redux-thunk'

// Logs all actions going through redux into console
// https://github.com/evgenyrodionov/redux-logger
import { reducer } from '../redux/todoRedux'

// http://redux.js.org/docs/advanced/Middleware.html
const middleware = [ thunk ]
const enhancer = compose(
  applyMiddleware(thunk),
  autoRehydrate()
);

// Can use a preloaded initialState if available, in this case we don't
export default (initialState) => {
  // http://redux.js.org/docs/api/createStore.html
  const store = createStore(
    reducer,
    initialState,
    enhancer
  );
  persistStore(store, {storage: AsyncStorage});
  return store
}
