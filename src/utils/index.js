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



export default {
    SDK,
    NIM
}