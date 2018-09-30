
export const setLocal = function(key, data) {
  // if (data instanceof Object) {
  //     data = JSON.stringify(data);
  // }
  wx.setStorageSync(key, data);
}
export const getLocal = function(key) {
  let data = localStorage.getItem(key);
  try {
      return JSON.parse(data);
  } catch (e) {
      return data;
  }
}
export const getStore = function (state, key){
  return state[key] === undefined || isEmpty(state[key]) ? getLocal(key) : state[key];
}
export const setStore = function (state, key, val){
  state[key] = val;
  setLocal(key, val);
  return state;
}

export const isEmpty = function (obj){
  let key
  let empty = true
  if (obj instanceof Object) {
    for (key in obj) {
      if (empty && obj.hasOwnProperty(key)) {
        empty = false
      }
    }
  }
  return empty
}
export default {
  isEmpty,
  getLocal,
  setLocal,
  getStore,
  setStore
}