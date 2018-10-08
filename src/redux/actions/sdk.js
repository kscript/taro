import * as config from '../../constants';
import {NIM, SESSION} from '../../utils'
import Taro from '@tarojs/taro';

export const account = val => {
    return {
      val,
      type: 'account'
    }
}
export const token = val => {
    return {
      val,
      type: 'token'
    }
}
export const appKey = val => {
    return {
      val,
      type: 'appKey'
    }
}
export const isLogin = val => {
    return {
      val,
      type: 'isLogin'
    }
}
export const sessionList = val => {
    return {
      val,
      type: 'sessionList'
    }
}

// 异步的action
export function login (option = {}) {
  return dispatch => {
    option.url = config.baseUrl + option.url;
    return Taro.request(option).then(response => {
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
  let events = option.events || ['onroamingmsgs','onofflinemsgs', 'onmsg', 'onsessions', 'onusers'];
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
      console.log([nim,data])
      nim.setOptions(data);
    })
  }
}