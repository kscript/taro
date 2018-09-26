const INITIAL_STATE = {
  account: '',
  token: ''
}

export default function sdk (state = INITIAL_STATE, action) {
    return INITIAL_STATE[action.type] !== undefined ? {
        ...state,
        [action.type]: action.val
      } : {
        ...state
      }
}
