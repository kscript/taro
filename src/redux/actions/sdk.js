import * as config from '../../constants';
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

// 异步的action
export function login (option) {
  return dispatch => {
    option.url = config.baseUrl + option.url;
    return Taro.request(option).then(response => {
      dispatch(account(option.data.account));
      dispatch(token(response.data.data.token));
      dispatch(appKey(response.data.data.appKey));
      return response.data;
    })
  }
}