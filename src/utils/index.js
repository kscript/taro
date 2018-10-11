import {store} from '../redux'

let nimInstance;
export let SDK;
if (process.env.TARO_ENV === 'weapp') {
    SDK = require('../assets/sdk/NIM_Web_SDK_v5.3.0.js');
} else if (process.env.TARO_ENV === 'h5') {
    SDK = require('../../static/sdk/NIM_Web_SDK_v5.6.0.js');
}
export const NIM = function(option){
    option = option || {};
    let State = store.getState();
    let account = option.account || State.sdk.account;
    let appKey = State.sdk.appKey;
    let token = State.sdk.token;
    return new Promise((resolve, reject) => {
        if(nimInstance){
            resolve(nimInstance)
        }else if(account){
            let config = {
                token,
                appKey,
                account
            };
            config.onconnect = option.onconnect || function () {
                resolve(nimInstance);
            };
            config.ondisconnect = option.onconnect || function (err) {
                reject(err);
            },
            config.onerror = option.onconnect || function (err) {
                reject(err);
            };
            config.db = process.env.TARO_ENV === 'weapp' ? false : option.db;
            config['syncMsgReceipts'] = true;
            config['needMsgReceipt'] = true;
            config['syncSessionUnread'] = true;
            config['syncRoamingMsgs'] = true;

            nimInstance = SDK.NIM.getInstance(config);
            console.log(nimInstance);
        } else {
            reject('account不存在');
        }
    })

}

export let SESSION = {
    getLocalSessions (option = {}) {
        return new Promise((resolve, reject) => {
            NIM().then(nim => {
                let config = {
                    limit: option.limit || 100,
                    done: (err, data) => {
                        if(err){
                            reject(err);
                        }else {
                            resolve(data);
                        }
                    }
                }
                nim.getLocalSessions(config);
            })
        })
    },
    getSessionsList(list){
        return new Promise((resolve, reject) => {
            NIM().then(nim => {
                nim.setOptions({
                    onsessions: data => {
                        resolve(nim.mergeSessions(list, data));
                    }
                });
            })
        })
    },
};
export const dataMapState = function (key, val, fn) {
    let maps = {};
    let keys = key instanceof Array ? key : [key];
    let data = {};
    if(val === undefined){
        data = this.$data
    }else{
        data[key] = val;
    }
    keys.forEach(function(item) {
        maps[item] = data[item]
    });
    this.setState(maps, fn);
}
export const setActions = function(actions, list, dispatch){
    let result = {};
    actions = actions || {};
    list = list || [];
    list.forEach(function(item, index){
        result[item] = function(option) {
            return dispatch(actions[index](option));
        }
    });
    return result;
}


export default {
    SDK,
    NIM
}