var Mock = require('mockjs');
// git提交时会忽略掉该文件
var localStorage = require('./localstorage.suo');
// 内容示例:
// var store = {
//   token: "...",
//   appKey: "..."
// }
// function LocalStorage(){
// }
// LocalStorage.prototype = {
//   constructor: LocalStorage,
//   getItem: function (key){
//     return store[key] || null;
//   }
// }
// module.exports = new LocalStorage();

module.exports = function() {

return {
  // 登录
  // 参数: account password
  login: {
    format: function(method, data, result){
      let account = data.account || data.username;
      result.data.token = localStorage.getItem(account) || localStorage.getItem('token')
      return result;
    },
    post: Mock.mock({
      code: 200,
      message: 'ok',
      data: {
        appKey: localStorage.getItem('appKey'),
        token: localStorage.getItem('token')
      }
    })
  },
  // 登录
  // 参数: account nickname password
  register: {
    post: Mock.mock({
      code: 200,
      message: 'ok',
      data: {
      }
    })
  },
  // 简历信息
  // 参数: account
  resumeInfo: {
    get: Mock.mock({
      code: 200,
      message: 'ok',
      data: {
        company: '****有限公司',
        positional: '产品助理',
        job: '产品经理',
        wages: '6-8k',
        location: '厦门'
      }
    })
},
  // 常用语
  // 参数: account
  talks: {
    get: Mock.mock({
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
    })
  },
  // 表情
  // 表情对象中 icon value 为必填属性
  emoji:  {
    get: Mock.mock({
      code: 200,
      message: 'ok',
      data: {
        default:{
          label: '默认',
          list:[
            {"phrase":"[广告]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/60/ad_new0902_org.gif","hot":true,"common":false,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/60/ad_new0902_thumb.gif","value":"[广告]","picid":""},
            {"phrase":"[doge]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/b6/doge_org.gif","hot":true,"common":false,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/b6/doge_thumb.gif","value":"[doge]","picid":""},
            {"phrase":"[喵喵]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/4a/mm_org.gif","hot":true,"common":false,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/4a/mm_thumb.gif","value":"[喵喵]","picid":""},
            {"phrase":"[二哈]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/74/moren_hashiqi_org.png","hot":true,"common":false,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/74/moren_hashiqi_thumb.png","value":"[二哈]","picid":""},
            {"phrase":"[神奇女侠]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/5a/yunying_zylmshenqi_org.png","hot":true,"common":false,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/5a/yunying_zylmshenqi_thumb.png","value":"[神奇女侠]","picid":""},
            {"phrase":"[蝙蝠侠]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/5b/yunying_zylmbianfuxia_org.png","hot":true,"common":false,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/5b/yunying_zylmbianfuxia_thumb.png","value":"[蝙蝠侠]","picid":""},
            {"phrase":"[笑cry]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/34/xiaoku_org.gif","hot":true,"common":false,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/34/xiaoku_thumb.gif","value":"[笑cry]","picid":""},
            {"phrase":"[摊手]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/09/pcmoren_tanshou_org.png","hot":true,"common":false,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/09/pcmoren_tanshou_thumb.png","value":"[摊手]","picid":""},
            {"phrase":"[抱抱]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/70/pcmoren_baobao_org.png","hot":true,"common":false,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/70/pcmoren_baobao_thumb.png","value":"[抱抱]","picid":""},
            {"phrase":"[跪了]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6c/pcmoren_guile_org.png","hot":true,"common":false,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6c/pcmoren_guile_thumb.png","value":"[跪了]","picid":""},
            {"phrase":"[吃瓜]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/8a/moren_chiguaqunzhong_org.png","hot":true,"common":false,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/8a/moren_chiguaqunzhong_thumb.png","value":"[吃瓜]","picid":""},
            {"phrase":"[哆啦A梦吃惊]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/f0/dorachijing_org.gif","hot":true,"common":false,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/f0/dorachijing_thumb.gif","value":"[哆啦A梦吃惊]","picid":""},
            {"phrase":"[坏笑]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/50/pcmoren_huaixiao_org.png","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/50/pcmoren_huaixiao_thumb.png","value":"[坏笑]","picid":""},
            {"phrase":"[舔屏]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/pcmoren_tian_org.png","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/pcmoren_tian_thumb.png","value":"[舔屏]","picid":""},
            {"phrase":"[污]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/3c/pcmoren_wu_org.png","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/3c/pcmoren_wu_thumb.png","value":"[污]","picid":""},
            {"phrase":"[允悲]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/2c/moren_yunbei_org.png","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/2c/moren_yunbei_thumb.png","value":"[允悲]","picid":""},
            {"phrase":"[笑而不语]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/3a/moren_xiaoerbuyu_org.png","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/3a/moren_xiaoerbuyu_thumb.png","value":"[笑而不语]","picid":""},
            {"phrase":"[费解]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/3c/moren_feijie_org.png","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/3c/moren_feijie_thumb.png","value":"[费解]","picid":""},
            {"phrase":"[憧憬]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/37/moren_chongjing_org.png","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/37/moren_chongjing_thumb.png","value":"[憧憬]","picid":""},
            {"phrase":"[并不简单]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/fc/moren_bbjdnew_org.png","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/fc/moren_bbjdnew_thumb.png","value":"[并不简单]","picid":""},
            {"phrase":"[微笑]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/5c/huanglianwx_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/5c/huanglianwx_thumb.gif","value":"[微笑]","picid":""},
            {"phrase":"[酷]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/8a/pcmoren_cool2017_org.png","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/8a/pcmoren_cool2017_thumb.png","value":"[酷]","picid":""},
            {"phrase":"[嘻嘻]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/0b/tootha_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/0b/tootha_thumb.gif","value":"[嘻嘻]","picid":""},
            {"phrase":"[哈哈]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6a/laugh.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6a/laugh.gif","value":"[哈哈]","picid":""},
            {"phrase":"[可爱]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/14/tza_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/14/tza_thumb.gif","value":"[可爱]","picid":""},
            {"phrase":"[可怜]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/af/kl_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/af/kl_thumb.gif","value":"[可怜]","picid":""},
            {"phrase":"[挖鼻]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/0b/wabi_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/0b/wabi_thumb.gif","value":"[挖鼻]","picid":""},
            {"phrase":"[吃惊]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/f4/cj_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/f4/cj_thumb.gif","value":"[吃惊]","picid":""},
            {"phrase":"[害羞]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6e/shamea_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6e/shamea_thumb.gif","value":"[害羞]","picid":""},
            {"phrase":"[挤眼]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/c3/zy_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/c3/zy_thumb.gif","value":"[挤眼]","picid":""},
            {"phrase":"[闭嘴]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/29/bz_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/29/bz_thumb.gif","value":"[闭嘴]","picid":""},
            {"phrase":"[鄙视]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/71/bs2_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/71/bs2_thumb.gif","value":"[鄙视]","picid":""},
            {"phrase":"[爱你]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6d/lovea_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6d/lovea_thumb.gif","value":"[爱你]","picid":""},
            {"phrase":"[泪]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/9d/sada_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/9d/sada_thumb.gif","value":"[泪]","picid":""},
            {"phrase":"[偷笑]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/19/heia_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/19/heia_thumb.gif","value":"[偷笑]","picid":""},
            {"phrase":"[亲亲]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/8f/qq_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/8f/qq_thumb.gif","value":"[亲亲]","picid":""},
            {"phrase":"[生病]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/b6/sb_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/b6/sb_thumb.gif","value":"[生病]","picid":""},
            {"phrase":"[太开心]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/58/mb_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/58/mb_thumb.gif","value":"[太开心]","picid":""},
            {"phrase":"[白眼]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d9/landeln_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d9/landeln_thumb.gif","value":"[白眼]","picid":""},
            {"phrase":"[右哼哼]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/98/yhh_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/98/yhh_thumb.gif","value":"[右哼哼]","picid":""},
            {"phrase":"[左哼哼]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6d/zhh_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6d/zhh_thumb.gif","value":"[左哼哼]","picid":""},
            {"phrase":"[嘘]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/a6/x_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/a6/x_thumb.gif","value":"[嘘]","picid":""},
            {"phrase":"[衰]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/af/cry.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/af/cry.gif","value":"[衰]","picid":""},
            {"phrase":"[委屈]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/73/wq_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/73/wq_thumb.gif","value":"[委屈]","picid":""},
            {"phrase":"[吐]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/9e/t_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/9e/t_thumb.gif","value":"[吐]","picid":""},
            {"phrase":"[哈欠]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/cc/haqianv2_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/cc/haqianv2_thumb.gif","value":"[哈欠]","picid":""},
            {"phrase":"[抱抱_旧]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/27/bba_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/27/bba_thumb.gif","value":"[抱抱_旧]","picid":""},
            {"phrase":"[怒]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/7c/angrya_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/7c/angrya_thumb.gif","value":"[怒]","picid":""},
            {"phrase":"[疑问]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/5c/yw_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/5c/yw_thumb.gif","value":"[疑问]","picid":""},
            {"phrase":"[馋嘴]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/a5/cza_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/a5/cza_thumb.gif","value":"[馋嘴]","picid":""},
            {"phrase":"[拜拜]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/70/88_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/70/88_thumb.gif","value":"[拜拜]","picid":""},
            {"phrase":"[思考]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/e9/sk_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/e9/sk_thumb.gif","value":"[思考]","picid":""},
            {"phrase":"[汗]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/24/sweata_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/24/sweata_thumb.gif","value":"[汗]","picid":""},
            {"phrase":"[困]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/kunv2_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/kunv2_thumb.gif","value":"[困]","picid":""},
            {"phrase":"[睡]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/96/huangliansj_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/96/huangliansj_thumb.gif","value":"[睡]","picid":""},
            {"phrase":"[钱]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/90/money_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/90/money_thumb.gif","value":"[钱]","picid":""},
            {"phrase":"[失望]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/0c/sw_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/0c/sw_thumb.gif","value":"[失望]","picid":""},
            {"phrase":"[色]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/20/huanglianse_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/20/huanglianse_thumb.gif","value":"[色]","picid":""},
            {"phrase":"[哼]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/49/hatea_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/49/hatea_thumb.gif","value":"[哼]","picid":""},
            {"phrase":"[鼓掌]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/36/gza_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/36/gza_thumb.gif","value":"[鼓掌]","picid":""},
            {"phrase":"[晕]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d9/dizzya_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d9/dizzya_thumb.gif","value":"[晕]","picid":""},
            {"phrase":"[悲伤]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/1a/bs_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/1a/bs_thumb.gif","value":"[悲伤]","picid":""},
            {"phrase":"[抓狂]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/62/crazya_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/62/crazya_thumb.gif","value":"[抓狂]","picid":""},
            {"phrase":"[黑线]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/91/h_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/91/h_thumb.gif","value":"[黑线]","picid":""},
            {"phrase":"[阴险]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6d/yx_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6d/yx_thumb.gif","value":"[阴险]","picid":""},
            {"phrase":"[怒骂]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/60/numav2_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/60/numav2_thumb.gif","value":"[怒骂]","picid":""},
            {"phrase":"[互粉]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/89/hufen_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/89/hufen_thumb.gif","value":"[互粉]","picid":""},
            {"phrase":"[打脸]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/32/dalian_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/32/dalian_thumb.gif","value":"[打脸]","picid":""},
            {"phrase":"[傻眼]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/2b/shayan_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/2b/shayan_thumb.gif","value":"[傻眼]","picid":""},
            {"phrase":"[感冒]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/a0/gm_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/a0/gm_thumb.gif","value":"[感冒]","picid":""},
            {"phrase":"[顶]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/91/d_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/91/d_thumb.gif","value":"[顶]","picid":""},
            {"phrase":"[ok]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d6/ok_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d6/ok_thumb.gif","value":"[ok]","picid":""},
            {"phrase":"[耶]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d9/ye_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d9/ye_thumb.gif","value":"[耶]","picid":""},
            {"phrase":"[good]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d8/good_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d8/good_thumb.gif","value":"[good]","picid":""},
            {"phrase":"[NO]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/ae/buyao_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/ae/buyao_org.gif","value":"[NO]","picid":""},
            {"phrase":"[赞]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d0/z2_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d0/z2_thumb.gif","value":"[赞]","picid":""},
            {"phrase":"[来]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/come_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/come_thumb.gif","value":"[来]","picid":""},
            {"phrase":"[弱]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d8/sad_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d8/sad_thumb.gif","value":"[弱]","picid":""},
            {"phrase":"[握手]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/0c/ws_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/0c/ws_thumb.gif","value":"[握手]","picid":""},
            {"phrase":"[拳头]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/cc/o_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/cc/o_thumb.gif","value":"[拳头]","picid":""},
            {"phrase":"[haha]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/13/ha_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/13/ha_thumb.gif","value":"[haha]","picid":""},
            {"phrase":"[加油]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/e7/pcmoren_jiayou_org.png","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/e7/pcmoren_jiayou_thumb.png","value":"[加油]","picid":""},
            {"phrase":"[心]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/hearta_org.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/hearta_thumb.gif","value":"[心]","picid":""},
            {"phrase":"[伤心]","type":"face","url":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/ea/unheart.gif","hot":false,"common":true,"category":"","icon":"//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/ea/unheart.gif","value":"[伤心]","picid":""}
          ]
        },
        hot:{
          label: '热门',
          list:[
            {"phrase":"[星星]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/76/hot_star171109_org.png","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/76/hot_star171109_thumb.png","value":"[星星]","picid":""},
            {"phrase":"[半星]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/f9/hot_halfstar_org.png","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/f9/hot_halfstar_thumb.png","value":"[半星]","picid":""},
            {"phrase":"[空星]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/ff/hot_blankstar_org.png","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/ff/hot_blankstar_thumb.png","value":"[空星]","picid":""},
            {"phrase":"[草泥马]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/3b/2018new_caonima_org.png","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/3b/2018new_caonima_thumb.png","value":"[草泥马]","picid":""},
            {"phrase":"[浮云]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/61/2018new_yunduo_org.png","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/61/2018new_yunduo_thumb.png","value":"[浮云]","picid":""},
            {"phrase":"[沙尘暴]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/b7/2018new_shachenbao_org.png","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/b7/2018new_shachenbao_thumb.png","value":"[沙尘暴]","picid":""},
            {"phrase":"[给力]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/36/2018new_geili_org.png","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/36/2018new_geili_thumb.png","value":"[给力]","picid":""},
            {"phrase":"[男孩儿]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/0a/2018new_nanhai_org.png","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/0a/2018new_nanhai_thumb.png","value":"[男孩儿]","picid":""},
            {"phrase":"[女孩儿]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/39/2018new_nvhai_org.png","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/39/2018new_nvhai_thumb.png","value":"[女孩儿]","picid":""},
            {"phrase":"[奥特曼]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/c6/2018new_aoteman_org.png","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/c6/2018new_aoteman_thumb.png","value":"[奥特曼]","picid":""},
            {"phrase":"[话筒]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/48/2018new_huatong_org.png","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/48/2018new_huatong_thumb.png","value":"[话筒]","picid":""},
            {"phrase":"[威武]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/14/2018new_weiwu_org.png","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/14/2018new_weiwu_thumb.png","value":"[威武]","picid":""},
            {"phrase":"[绿丝带]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/cb/2018new_lvsidai_org.png","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/cb/2018new_lvsidai_thumb.png","value":"[绿丝带]","picid":""},
            {"phrase":"[微风]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/c7/2018new_weifeng_org.png","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/c7/2018new_weifeng_thumb.png","value":"[微风]","picid":""},
            {"phrase":"[礼物]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/0e/2018new_liwu_org.png","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/0e/2018new_liwu_org.png","value":"[礼物]","picid":""},
            {"phrase":"[飞机]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/4a/2018new_feiji_org.png","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/4a/2018new_feiji_thumb.png","value":"[飞机]","picid":""},
            {"phrase":"[干杯]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/2018new_ganbei_org.png","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/2018new_ganbei_org.png","value":"[干杯]","picid":""},
            {"phrase":"[围脖]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/64/2018new_weibo_org.png","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/64/2018new_weibo_org.png","value":"[围脖]","picid":""},
            {"phrase":"[钟]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/8e/2018new_zhong_org.png","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/8e/2018new_zhong_org.png","value":"[钟]","picid":""},
            {"phrase":"[肥皂]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d6/2018new_feizao_org.png","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d6/2018new_feizao_thumb.png","value":"[肥皂]","picid":""},
            {"phrase":"[蜡烛]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/16/2018new_lazhu_org.png","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/16/2018new_lazhu_org.png","value":"[蜡烛]","picid":""},
            {"phrase":"[月亮]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d5/2018new_yueliang_org.png","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d5/2018new_yueliang_org.png","value":"[月亮]","picid":""},
            {"phrase":"[围观]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6c/2018new_weiguan_org.png","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6c/2018new_weiguan_org.png","value":"[围观]","picid":""},
            {"phrase":"[蛋糕]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/f9/2018new_dangao_org.png","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/f9/2018new_dangao_thumb.png","value":"[蛋糕]","picid":""},
            {"phrase":"[音乐]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/1f/2018new_yinyue_org.png","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/1f/2018new_yinyue_org.png","value":"[音乐]","picid":""},
            {"phrase":"[猪头]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/1c/2018new_zhutou_org.png","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/1c/2018new_zhutou_thumb.png","value":"[猪头]","picid":""},
            {"phrase":"[鲜花]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d4/2018new_xianhua_org.png","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d4/2018new_xianhua_org.png","value":"[鲜花]","picid":""},
            {"phrase":"[太阳]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/cd/2018new_taiyang_org.png","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/cd/2018new_taiyang_org.png","value":"[太阳]","picid":""},
            {"phrase":"[下雨]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/7e/2018new_yu_org.png","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/7e/2018new_yu_thumb.png","value":"[下雨]","picid":""},
            {"phrase":"[兔子]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/c6/2018new_tuzi_org.png","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/c6/2018new_tuzi_thumb.png","value":"[兔子]","picid":""},
            {"phrase":"[骷髅]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/a1/2018new_kulou_org.png","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/a1/2018new_kulou_thumb.png","value":"[骷髅]","picid":""},
            {"phrase":"[照相机]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/78/2018new_xiangji_org.png","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/78/2018new_xiangji_thumb.png","value":"[照相机]","picid":""},
            {"phrase":"[熊猫]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/aa/2018new_xiongmao_org.png","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/aa/2018new_xiongmao_thumb.png","value":"[熊猫]","picid":""},
            {"phrase":"[喜]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/e0/2018new_xizi_org.png","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/e0/2018new_xizi_thumb.png","value":"[喜]","picid":""},
            {"phrase":"[看涨]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/fe/kanzhangv2_org.gif","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/fe/kanzhangv2_thumb.gif","value":"[看涨]","picid":""},
            {"phrase":"[看跌]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/c5/kandiev2_org.gif","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/c5/kandiev2_thumb.gif","value":"[看跌]","picid":""},
            {"phrase":"[带着微博去旅行]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/ec/eventtravel_org.gif","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/ec/eventtravel_thumb.gif","value":"[带着微博去旅行]","picid":""},
            {"phrase":"[偷乐]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/fa/lxhtouxiao_org.gif","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/fa/lxhtouxiao_thumb.gif","value":"[偷乐]","picid":""},
            {"phrase":"[笑哈哈]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/32/lxhwahaha_org.gif","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/32/lxhwahaha_thumb.gif","value":"[笑哈哈]","picid":""},
            {"phrase":"[羞嗒嗒]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/df/lxhxiudada_org.gif","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/df/lxhxiudada_thumb.gif","value":"[羞嗒嗒]","picid":""},
            {"phrase":"[好爱哦]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/74/lxhainio_org.gif","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/74/lxhainio_thumb.gif","value":"[好爱哦]","picid":""},
            {"phrase":"[赞啊]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/00/lxhzan_org.gif","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/00/lxhzan_thumb.gif","value":"[赞啊]","picid":""},
            {"phrase":"[求关注]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/ac/lxhqiuguanzhu_org.gif","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/ac/lxhqiuguanzhu_thumb.gif","value":"[求关注]","picid":""},
            {"phrase":"[好喜欢]","type":"face","url":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d6/lxhlike_org.gif","hot":false,"common":false,"category":"热门","icon":"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d6/lxhlike_thumb.gif","value":"[好喜欢]","picid":""}
          ]
        }
      }
    })
  }
}
}