import {loadState, saveState} from '../../utils/storage.js'

const INITIAL_STATE = loadState({
  account: '',
  token: '',
  appKey: '',
  detail: {},
  sessionList: [],
  isLogin: 0
})

export default function sdk (state = INITIAL_STATE, action) {
  action.cache && saveState(action.type, action.val);
  return INITIAL_STATE[action.type] === undefined ? {
      ...state
    } : {
      ...state,
      [action.type]: action.val
    }
}
