
let Storage = localStorage || {};
if (process.env.TARO_ENV === 'weapp') {
  Storage = {
    getItem: wx.getStorageSync,
    removeItem: wx.removeStorageSync,
    setItem: wx.setStorageSync,
    clear: wx.clearStorageSync
  }
}
/**
 * 加载本地数据
 * @func
 * @param obj {object} redux里的默认属性
 * @param pref {string} 预留的属性前缀, 后期可能会用到
 */
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
/**
 * 保存state到本地
 * @func
 * @param key {string} 要保存的属性
 * @param val {any} 要保存的属性的值
 * @param pref {string} 预留的属性前缀, 后期可能会用到
 */
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