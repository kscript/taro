
let Storage = localStorage || {};
if (process.env.TARO_ENV === 'weapp') {
  Storage = {
    getItem: wx.getStorageSync,
    removeItem: wx.removeStorageSync,
    setItem: wx.setStorageSync
  }
}
export const loadState = (obj, pref = '') => {
  let result = {};
  for(let key in obj){
    let state = Storage.getItem(pref + key);
    try{
      result[key] = JSON.parse(state);
    }catch(e){
      result[key] = state || obj[key];
    }
  }
  return result;
}
export const saveState = (key, val, pref = '') => {
  try {
    Storage.setItem(pref + key, val);
  } catch (err) {
    // ...错误处理
  }
};

export default {
  loadState,
  saveState
}