import {loadState, saveState} from '../../utils/storage.js'

const INITIAL_STATE = loadState({
  account: '',
  token: '',
  appKey: '',
  detail: {},
  profile: {},
  profiles: {},
  sessions: {},
  isLogin: 0
})

export default function sdk (state = INITIAL_STATE, action) {
  let result = action.val;
  if(action.handler){
    result = action.handler(state);
  }
  action.cache && saveState(action.type, action.val);
  return INITIAL_STATE[action.type] === undefined ? {
      ...state
    } : {
      ...state,
      [action.type]: result
    }
}
