let nims = {};
export let SDK;
if (process.env.TARO_ENV === 'weapp') {
    SDK = require('./assets/sdk/NIM_Web_SDK_v5.6.0.js');
} else if (process.env.TARO_ENV === 'h5') {
    SDK = require('../../static/sdk/NIM_Web_SDK_v5.6.0.js');
}

export const nim = function(option){
    return SDK.NIM.getInstance(option)
}

export default {
    SDK,
    nim
}