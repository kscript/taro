import * as config from '../../constants';
import Taro from '@tarojs/taro';
import {NIM, SESSION} from '../../utils'

// export * from './func.js';
import {
  getHistory,
  getTalks,
  // login,
  getSessionList,
  sendMessage,
  onmessage,
  sendMsgReceipt,
  addEventListener,
  getEmoji
} from './func.js';

export {
  getHistory,
  getTalks,
  // login,
  getSessionList,
  sendMessage,
  onmessage,
  sendMsgReceipt,
  addEventListener,
  getEmoji
}
export const account = val => {
    return {
      val,
      cache: true,
      type: 'account'
    }
}
export const token = val => {
    return {
      val,
      cache: true,
      type: 'token'
    }
}
export const appKey = val => {
    return {
      val,
      cache: true,
      type: 'appKey'
    }
}
export const isLogin = val => {
    return {
      val,
      cache: true,
      type: 'isLogin'
    }
}
export const detail = val => {
  return {
    val,
    cache: false,
    type: 'detail'
  }
}
export const emoji = val => {
  return {
    val,
    cache: false,
    type: 'emoji'
  }
}

export const profile = val => {
  return {
    val,
    cache: true,
    type: 'profile'
  }
}
export const profiles = val => {
  return {
    val,
    cache: false,
    type: 'profiles'
  }
}
export const sessions = val => {
    return {
      val,
      cache: false,
      type: 'sessions'
    }
}
export const sessionsItem = val => {
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

// 异步的action
export const login = function  (option = {}) {
  return dispatch => {
    option.url = config.baseUrl + option.url;
    // return Taro.request(option).then(response => {
    return new Promise(resolve => resolve()).then(data => {
      return {
        data: {
          code: 200,
          message: 'ok',
          data: {
            token: "e5a8573ad3f165423f66dea2a2f29237",
            appKey: "9877e7b70f30866c74e409a5ea60373d"
          }
        }
      }
    })
    .then(response => {
      dispatch(account(option.data.account));
      dispatch(token(response.data.data.token));
      dispatch(appKey(response.data.data.appKey));
      dispatch(isLogin(1));
      return NIM();
    })
  }
}
