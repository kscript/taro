let nimInstance;
export let SDK;
if (process.env.TARO_ENV === 'weapp') {
    SDK = require('../assets/sdk/NIM_Web_SDK_v5.3.0.js');
} else if (process.env.TARO_ENV === 'h5') {
    SDK = require('../../static/sdk/NIM_Web_SDK_v5.6.0.js');
}

export let nim = function(option){
    option = option || {};
    return new Promise((resolve, reject) => {
        if(nimInstance){
            resolve(nimInstance)
        }else if(option.account){
            nimInstance = SDK.NIM.getInstance({
                appKey: "9877e7b70f30866c74e409a5ea60373d",
                token: "9d8886c048fbf815848becb1e07f5232", 
                account: option.account,
                onconnect: () => {
                    resolve(nimInstance)
                },
                ondisconnect: err => {
                    reject(err)
                },
                onerror: err => {
                    reject(err)
                }
            });
        } else {
            reject('option.account属性不能为空')
        }
    })

}

export default {
    SDK,
    nim
}