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
export const sessionList = val => {
    return {
      val,
      cache: true,
      type: 'sessionList'
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
    }).then(response => {
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

export function onmessage (option = {}) {
  option.eventBus = option.eventBus || function(){};
  let data = option.data || {};
  let events = ['onroamingmsgs','onofflinemsgs', 'onmsg'];
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