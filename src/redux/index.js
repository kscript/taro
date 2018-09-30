import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'

const middlewares = [
  thunkMiddleware,
  createLogger()
]

const configStore = function () {
  const store = createStore(rootReducer, applyMiddleware(...middlewares))
  return store
}
export const store = configStore();
export default configStore