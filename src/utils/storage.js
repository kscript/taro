
let Storage = localStorage || {};
if (process.env.TARO_ENV === 'weapp') {
  Storage = {
    getItem: wx.getStorageSync,
    removeItem: wx.removeStorageSync,
    setItem: wx.setStorageSync,
    clear: wx.clearStorageSync
  }
}
export const loadState = (obj, pref = '') => {
  let result = {};
  for(let key in obj){
    let state = Storage.getItem(pref + key);
    if(state === null){
      state = obj[key];
    }
    try{
      result[key] = JSON.parse(state);
    }catch(e){
      result[key] = state || obj[key];
    }
  }
  if(result )
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