import { combineReducers } from 'redux'
import counter from './counter'
import sdk from './sdk'

export default combineReducers({
  counter,
  sdk
})
