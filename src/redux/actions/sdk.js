import * as config from '../../constants';
import {NIM, SESSION} from '../../utils'
import Taro from '@tarojs/taro';

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
export const sessionList = val => {
    return {
      val,
      cache: true,
      type: 'sessionList'
    }
}

export function getHistory(option){
  return dispatch => {
    return NIM().then(nim => {
        return new Promise((resolve, reject) => {
            nim.getHistoryMsgs({
                scene: 'p2p',
                to: option.to,
                asc: true,
                lastMsgId: option.lastMsgId,
                endTime: option.endTime,
                limit: option.limit,
                done: (error, data) => {
                    if(error){
                        reject(error);
                    } else {
                        resolve(data);
                    }
                }
            });
        })
    })
  }
}

// 异步的action
export function login (option = {}) {
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

export function getSessionList (option = {}) {
  return dispatch => {
    return SESSION.getLocalSessions(option)
  }
}
export function sendMessage (option = {}) {
  return dispatch => {
    return NIM().then(nim => {
        return new Promise((resolve, reject) => {
          let fn = option.done;
          // 扩展从option传过来的done方法, 增加 next 函数, 手动控制Promise完成的时机
          option.done = (error, data) => {
            let next = () => {
              if(error){
                reject(error);
              } else {
                resolve(data);
              }
            }
            fn ? fn(error, data, next) : next();
          }
          nim.sendText(option);
        })
    })
  }
}

export function onmessage (option = {}) {
  option.eventBus = option.eventBus || function(){};
  let data = option.data || {};
  let events = option.events || [];
  events.forEach(item => {
    if(!data[item]){
      data[item] = function(){
        let args = [].slice.apply(arguments);
        args.unshift(item);
        return option.eventBus.apply(null, args)
      }
    }
  });
  return dispatch => {
    NIM().then(nim => {
      nim.setOptions(data);
    })
  }
}