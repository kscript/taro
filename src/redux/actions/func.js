
import * as config from '../../constants';
import Taro from '@tarojs/taro';
import {NIM, SESSION} from '../../utils'

export const getHistory = function (option){
  return dispatch => {
    return NIM().then(nim => {
        return new Promise((resolve, reject) => {
            nim.getHistoryMsgs({
                scene: 'p2p',
                to: option.to,
                asc: true,
                lastMsgId: option.lastMsgId,
                endTime: option.endTime,
                limit: option.limit,
                done: (error, data) => {
                    if(error){
                        reject(error);
                    } else {
                        // 需要使用nim的消息合并功能
                        resolve({data, nim});
                    }
                }
            });
        })
    })
  }
}
export const getTalks = function (option){
  return dispatch => {
    // 在预览小程序时使用
    // 前端mock数据
    return new Promise(resolve => resolve()).then(data => {
      return {
        data: {
          code: 200,
          message: 'ok',
          data: [
            {
              id: 1,
              text: '你好'
            },
            {
              id: 2,
              text: '我可以去贵公司面试吗？'
            },
            {
              id: 3,
              text: '我可以把我的简历发给您看看吗？'
            },
            {
              id: 4,
              text: '对不起，我觉得该职位不太适合我，祝您早日找到满意的工作人选'
            }
          ]
        }
      }
    });
    // 后端mock数据
    // return Taro.request({
    //   url: config.baseUrl + 'talks',
    //   method: 'GET'
    // })
  }
}
export const getEmoji = function (option){
  return dispatch => {
    // 在预览小程序时使用
    // 前端mock数据
    // return new Promise(resolve => resolve()).then(data => {
    //   return {
    //     data: {
    //       code: 200,
    //       message: 'ok',
    //       data:{
    //         default:{
    //           label: '默认',
    //           list:[
    //             {"phrase":"[广告]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/60/ad_new0902_org.gif","hot":true,"common":false,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/60/ad_new0902_thumb.gif","value":"[广告]","picid":""},
    //             {"phrase":"[doge]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/b6/doge_org.gif","hot":true,"common":false,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/b6/doge_thumb.gif","value":"[doge]","picid":""},
    //             {"phrase":"[喵喵]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/4a/mm_org.gif","hot":true,"common":false,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/4a/mm_thumb.gif","value":"[喵喵]","picid":""},
    //             {"phrase":"[二哈]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/74/moren_hashiqi_org.png","hot":true,"common":false,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/74/moren_hashiqi_thumb.png","value":"[二哈]","picid":""},
    //             {"phrase":"[神奇女侠]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/5a/yunying_zylmshenqi_org.png","hot":true,"common":false,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/5a/yunying_zylmshenqi_thumb.png","value":"[神奇女侠]","picid":""},
    //             {"phrase":"[蝙蝠侠]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/5b/yunying_zylmbianfuxia_org.png","hot":true,"common":false,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/5b/yunying_zylmbianfuxia_thumb.png","value":"[蝙蝠侠]","picid":""},
    //             {"phrase":"[笑cry]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/34/xiaoku_org.gif","hot":true,"common":false,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/34/xiaoku_thumb.gif","value":"[笑cry]","picid":""},
    //           ]
    //         }
    //       }
    //     }
    //   }
    // });
    // // 后端mock数据
    return Taro.request({
      url: config.baseUrl + 'emoji',
      method: 'GET'
    })
  }
}

export const getSessionList = function (option = {}) {
  return dispatch => {
    return SESSION.getLocalSessions(option)
  }
}
export const sendMessage = function (option = {}) {
  return dispatch => {
    return NIM().then(nim => {
        return new Promise((resolve, reject) => {
          let fn = option.done;
          // 扩展从option传过来的done方法, 增加 next 函数, 手动控制Promise完成的时机
          option.done = (error, data) => {
            let next = () => {
              if(error){
                reject(error);
              } else {
                // 创建一条本地消息
                // 为了让其它位置也能得到发送消息的回调
                nim.sendCustomMsg({
                  to: option.to,
                  text: option.text,
                  scene: 'p2p',
                  isLocal: true,
                  content: '{type: "local"}',
                  done: err => {
                    if(err){
                      reject(err);
                    }else{
                      // 忽略本地消息内容, 返回发送消息的回调数据
                      resolve(data);
                    }
                  }
                })
              }
            }
            fn ? fn(error, data, next) : next();
          }
          nim.sendText(option);
        })
    })
  }
}

export const onmessage = function (option = {}) {
  option.eventBus = option.eventBus || function(){};
  let data = option.data || {};
  let events = option.events || [];
  events.forEach(item => {
    if(!data[item]){
      data[item] = function(){
        let args = [].slice.apply(arguments);
        args.unshift(item);
        return option.eventBus.apply(null, args)
      }
    }
  });
  return dispatch => {
    NIM().then(nim => {
      nim.setOptions(data);
    })
  }
}

export const addEventListener= function (){
  return dispatch => {
    NIM().then(nim=> {
      let options = {
        // 是否同步黑名单和静音列表
        syncRelations: true,
        // 是否同步好友列表
        syncFriends: true, 
        // 是否同步好友对应的用户名片列表
        syncFriendUsers: true, 

         // 是否同步已读回执时间戳
         syncMsgReceipts: true, 

         // 消息回执
         needMsgReceipt: true,
         
         // 会话相关
         // 是否同步会话的未读数
         syncSessionUnread: true, 
      };
      let messages = [
        'onmsg', // 收到消息
        'onroamingmsgs', // 同步漫游消息
        'onofflinemsgs', // 同步离线消息
        'onsessions', // 同步最近会话列表
        'onupdatesession', // 更新会话

        'onloginportschange', // 多端登录状态变化
        'onblacklist', // 同步黑名单
        'onsyncmarkinblacklist', // 用户在其它端操作黑名单
        'onmutelist', // 同步静音列表
        'onsyncmarkinmutelist', // 用户在其它端操作静音列表
        'onfriends', // 同步好友列表
        'onsyncfriendaction', // 用户在其它端对好友相关操作
        'onmyinfo', // 同步用户信息
        'onupdatemyinfo', // 用户在其它端修改个人信息
        'onusers', // 同步好友用户名片
        'onupdateuser', // 用户名片更新

        'onroamingsysmsgs', // 同步漫游系统通知
        'onofflinesysmsgs', // 同步离线系统通知
        'onsysmsg', // 收到系统通知
        'oncustomsysmsg', // 收到自定义系统通知
        'onupdatesysmsg', // 更新系统通知
        'onsysmsgunread', // 收到系统通知未读数
        'onupdatesysmsgunread', // 更新系统通知未读数
        'onofflinecustomsysmsgs', // 同步离线自定义系统通知
      ];
      messages.forEach(item => {
        options[item] = (...args) => {
          args.unshift(item);
          console.log(args);
          Taro.eventCenter.trigger('sdk.messages', args);
        }
      })
      nim.setOptions(options)
    })
  }
}
export const sendMsgReceipt = function(msg = {}) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      NIM().then(nim => {
        nim.sendMsgReceipt({
          msg: msg,
          done: (err, data) => {
              err ? reject(err) : resolve(data)
          },
        });
      })
    })
  }
}

export default {
  getHistory,
  getTalks,
  getSessionList,
  sendMessage,
  onmessage,
  sendMsgReceipt,
  addEventListener,
  getEmoji
}