const INITIAL_STATE = {
  account: '',
  token: '',
  appKey: ''
}

export default function sdk (state = INITIAL_STATE, action) {
  return INITIAL_STATE[action.type] === undefined ? {
      ...state
    } : {
      ...state,
      [action.type]: action.val
    }
}
