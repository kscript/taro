export const loadState = (obj, pref = '') => {
  let result = {};
  for(let key in obj){
    let state = localStorage.getItem(pref + key);
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
    localStorage.setItem(pref + key, val);
  } catch (err) {
    // ...错误处理
  }
};
export default {
  loadState,
  saveState
}