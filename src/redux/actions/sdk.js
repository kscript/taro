// export * from './func.js';
import {
  getHistory,
  login,
  getSessionList,
  sendMessage,
  onmessage,
  addEventListener
} from './func.js';
export {
  getHistory,
  login,
  getSessionList,
  sendMessage,
  onmessage,
  addEventListener
}
const account = val => {
    return {
      val,
      cache: true,
      type: 'account'
    }
}
const token = val => {
    return {
      val,
      cache: true,
      type: 'token'
    }
}
const appKey = val => {
    return {
      val,
      cache: true,
      type: 'appKey'
    }
}
const isLogin = val => {
    return {
      val,
      cache: true,
      type: 'isLogin'
    }
}
const detail = val => {
  return {
    val,
    cache: false,
    type: 'detail'
  }
}
const emoji = val => {
  return {
    val,
    cache: false,
    type: 'emoji'
  }
}

const profile = val => {
  return {
    val,
    cache: true,
    type: 'profile'
  }
}
const profiles = val => {
  return {
    val,
    cache: false,
    type: 'profiles'
  }
}
const sessions = val => {
    return {
      val,
      cache: false,
      type: 'sessions'
    }
}
const sessionsItem = val => {
    return {
      val,
      cache: false,
      handler: state => {
        state.sessions[val.key] = val.value;
        return state.sessions;
      },
      type: 'sessions'
    }
}

export {

  account,
  token,
  appKey,
  isLogin,
  detail,
  emoji,
  profile,
  profiles,
  sessions,
  sessionsItem,

}

export default {

  account,
  token,
  appKey,
  isLogin,
  detail,
  emoji,
  profile,
  profiles,
  sessions,
  sessionsItem

}