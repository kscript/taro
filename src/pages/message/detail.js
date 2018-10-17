import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { AtGrid, AtButton, AtInput, AtForm, AtIcon, AtModal} from 'taro-ui'
import { connect } from '@tarojs/redux'
import { dataMapState, setActions} from '../../utils'
import List from './list'
import { getSessionList, getHistory, sendMessage, detail, sessionsItem , emoji} from '../../redux/actions/sdk'

import './detail.scss'

@connect(({ sdk }) => ({
  sdk
}), dispatch => {
  return {
    getSessionList: option => {
      return dispatch(getSessionList(option))
    },
    getHistory: option => {
      return dispatch(getHistory(option))
    },
    sendMessage: option => {
      return dispatch(sendMessage(option))
    },
    detail: option => {
      return dispatch(detail(option))
    },
    sessionsItem: option => {
      return dispatch(sessionsItem(option))
    },
    emoji: option => {
      return dispatch(emoji(option))
    }
  }
})
/**
 * @classdesc
 * 会话详情
 */
class Message extends Component {
  /**
   * @constructor
   */
  constructor() {
    super(...arguments)
    console.log(this)
    this.$data = {
      sending: false, //发送消息状态
      scrollTop: 0,
      scrollCallback: null,
      rects: {},
      detail: {
        init: false,
        me: {}, // 自己的信息
        current: {}, // 当前会话信息
        sessions: {}, // 当前信息
        resume: {}, // 简历信息
        history: {  // 会话历史记录相关
          to: '',
          max: 100, // 消息列表最多显示条数, 超出则溢出
          limit: 50, // 每次加载条数
          roaming: 0,
          count: 0, // 收到的消息数
          endTime: 0, // 最后一条消息的time
          loadState: 0,
          lastMsgId: 0, // 最后一条消息的id
          overflow: false, // 溢出
          complete: false, // 全部加载完成
        }
      }
    };
    this.state = {
      modal: {
        talk: {
          isOpen: false
        }
      },
      sessions: {},
      newSessions: {},
      scrollTop: 0,
      scrollHeight: 0,
      loadState: 0, // 0未加载 1正在加载
      messageText: '',
      grid: [
        {
          image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
          value: '换电话'
        },
        {
          image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
          value: '换微信'
        },
        {
          image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
          value: '发简历'
        },
        {
          image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
          value: '不感兴趣'
        }
      ],
      show: false
    }
  }
  config = {
    navigationBarTitleText: '聊天'
  }
  componentDidMount(){
    let to = this.$router.params.to;
    let sessions = (this.props.sdk.sessions || {})[to] || {};
    let detail = this.$data.detail;
    detail.sessions = sessions;
    if (!this.$data.detail.init) {
      if (sessions && sessions.history) {
        detail.history = sessions.history;
        this.setState({
          sessions
        },() => {
          this.$data.scrollCallback = () => {
            this.scrollHandler('bottom');
          }
          this.scrollViewInit();
        });
      } else {
        detail.history.roaming = sessions.roaming = (sessions.msgs || []).length;
        this.getHistory();
      }
    }
  }

  componentWillMount () {
    console.log([this, Taro]);
    let history = this.$data.detail.history;
    history.to = this.$router.params.to;

    Taro.eventCenter.on('sdk.messages', args => {
      let type = args[0];
      this[type] && this[type](args[1]);
    });
    Taro.setNavigationBarTitle({
      title: '与 ' + history.to + ' 对话中'
    })
  }
  dataMapState (key, val, fn = () => {}){
    dataMapState.call(this, key, val, fn);
  }

  gridClick(){

  }

  inputChange(text){
    this.setState({
      messageText: text
    })
  }
  /**
   * 收到消息
   * @func
   * @param data {object} 消息
   */
  onmsg(data){
    this.addMessage(data)
  }
  /**
   * 发送消息
   * @func
   * @param text {string} 消息文本内容
   */
  sendMessage(text){
    if(this.$data.sending)return ;
    this.$data.sending = true;
    let to = this.$router.params.to;
    this.props.sendMessage({
      to,
      text,
      scene: 'p2p',
      needMsgReceipt: true
    }).then(data => {
      this.addMessage(data);
    })
  }
  /**
   * 添加本地消息到列表
   * @func
   * @param text {object} 消息
   */
  addMessage(data){
    this.setState(prevProps => {
      let sessions = prevProps.sessions;
      sessions.msgs.push(data);
      this.$data.detail.history.count++;
      return {
        sessions,
        messageText: ''
      }
    }, () => {
      this.$data.sending = false;
      this.$data.scrollCallback = data => {
        this.scrollHandler('bottom', null, data);
      }
      this.scrollViewInit();
    });
  }
  onSubmit(){

  }
  /**
   * 设置滚动条相关数据
   * @func
   */
  scrollViewInit(){
    if(!this.$data.detail.init){
      if(this.refs.scrollView){
        this.$data.detail.init = true;
        if(!this.refs.scrollView.boundingClientRect){
          // 没有boundingClientRect 说明是h5环境
          this.refs.scrollView.boundingClientRect = callback => {
            return boundingClientRect.call(this.refs.scrollView, callback);
          };
          // data: height 容器高度 scrollHeight 内容高度
          this.refs.scrollView.boundingClientRect(data => {
            let result = {
              height: data.scrollHeight,
              oldHeight: this.$data.rects.height || 0
            }
            this.$data.rects = result;
            this.$data.scrollCallback && this.$data.scrollCallback(result);
          }).exec();

        } else {
          this.refs.scrollBox.boundingClientRect(data => {
            let result = {
              height: data.height,
              oldHeight: this.$data.rects.height || 0
            }
            this.$data.rects = result;
            this.$data.scrollCallback && this.$data.scrollCallback(result);
          }).exec();
        }
        
      }
    } else {
      if(this.refs.scrollBox.boundingClientRect){
        this.refs.scrollBox.boundingClientRect().exec();
      } else {
        this.refs.scrollView.boundingClientRect().exec();
      }
    }
    function boundingClientRect(callback){
      let queue = [];
      let rects = {
        height: this.container.clientHeight,
        scrollHeight: this.container.scrollHeight
      };
      let func = function(){
        callback && callback(rects);
      }
      if(callback){
        queue.push(func);
      }
      func.exec = function(){
        queue.forEach(item => {
          item();
        })
      }
      return func;
    }
  }
  /**
   * 设置滚动条位置
   * @func
   * @param location {number|string} number/top/bottom/history
   * @param callback {function} 设置完滚动条位置后的回调
   * @param data {object} 滚动条相关高度的信息
   */
  scrollHandler(location, callback, data){
    let height = 0;
    data = data || this.$data.rects;
    if(!data) return;
    if (location === 'history') {
      height = data.height - data.oldHeight + 4;
    } else if(location === 'bottom') {
      height = data.height
    } else if(location === 'top') {
      height = 0
    } else {
      height = location
    }

    this.setState({
      scrollTop: height
    }, callback);
  }
  /**
   * 获取云端历史记录
   * @func
   * @param mode {string} history/bottom 用于加载完历史记录后滚动到底部
   */
  getHistory(mode){
    let detail = this.$data.detail;
    let history = detail.history;
    // 如果是 加载中 / 已全部加载 / 消息数溢出
    if(history.loadState || history.complete || history.overflow)return ;
    history.loadState = 1;
    this.setState({
      loadState: 1
    }, () => {
      this.props.getHistory(history)
        .then(({data, nim}) => {
          if(data.msgs && data.msgs.length){
            // 剩余空间 = 上限 - 本次 - (已加载 - 新消息 - 漫游)
            let space = history.max - history.limit - (detail.sessions.msgs || []).length + history.count + history.roaming;
            // 超出剩余空间 为 溢出
            history.overflow = data.msgs.length > space;
            // 小于预期时 为 加载完成
            history.complete = data.msgs.length < history.limit;
            detail.sessions.msgs = nim.mergeMsgs(data.msgs, detail.sessions.msgs || []);
            // detail.sessions = data;
            history.lastMsgId = data.msgs[0].idServer;
            history.endTime = data.msgs[0].time;
            detail.sessions.history = history;
            this.setState({
              sessions: detail.sessions,
              loadState: 0
            }, () => {
              this.props.sessionsItem({
                key: detail.sessions.to,
                value: detail.sessions
              });
              this.$data.scrollCallback = () => {
                this.scrollHandler(mode || 'bottom');
                this.$data.detail.history.loadState = 0;
              }
              this.scrollViewInit();
            })
          }else{
            history.complete = true;
            detail.sessions.history = history;
            this.props.sessionsItem({
              key: detail.sessions.to,
              value: detail.sessions
            });
            this.setState({
              loadState: 0
            }, () => {
              this.$data.detail.history.loadState = 0;
            })
          }
        });
    })
  }
  /**
   * 选择话术
   * @func
   */
  selectTalk(){
    this.setState(prevProps => {
      prevProps.modal.talk.isOpen = true;
      return prevProps
    })
  }
  talkCancel(){
    this.setState(prevProps => {
      prevProps.modal.talk.isOpen = false;
      return prevProps
    })
  }
  talkConfirm(){
    this.setState(prevProps => {
      prevProps.modal.talk.isOpen = false;
      return prevProps
    })
  }
  onClick(){
    console.log(this, 111)
  }
  render () {
    return (
      <View className='detail'>
        <AtModal
          onClick={this.onClick}
          isOpened={this.state.modal.talk.isOpen}
          title='常用语'
          content='欢迎加入京东凹凸实验室\n\r欢迎加入京东凹凸实验室'
        />
        <View className="grid-box">
          <AtGrid data={this.state.grid} hasBorder={false} columnNum={4} onClick={this.gridClick} />
        </View>
        <ScrollView
          ref="scrollView"
          className="scrollview message-list"
          style="white-space:nowrap;height:100vh;"
          scrollY
          scrollWithAnimation={true}
          upperThreshold={10}
          scrollTop={this.state.scrollTop}
          onScrollToUpper={this.getHistory.bind(this, 'history')}
          onScrolltoupper={this.getHistory.bind(this, 'history')}
          >
            <View ref="scrollBox">
              <View className="loading-text">
                {this.state.loadState == 1 ? '正在加载..': ' '}
              </View>
              <View className="at-row-list">
                <View className="hidden-list">
                  <View ref="hiddenList">
                    <List list={this.state.newSessions.msgs || []} my-class="message-type-hidden"></List>
                  </View>
                </View>
                <List list={this.state.sessions.msgs || []} my-class="message-type-normal"></List>
              </View>
            </View>
          </ScrollView>

        <View className="editor-box">
          <AtForm>
          <AtInput
            clear
            cursorSpacing={8}
            type='text'
            placeholder='新消息'
            value={this.state.messageText}
            onChange={this.inputChange}
            onConfirm={this.sendMessage}
          >
            <View className="prefix-box">
              <AtButton
                type='primary'
                size='small'
                onClick={this.selectTalk.bind(this)}
                >常用语</AtButton>
            </View>
            <View className="suffix-box">
              <AtIcon prefixClass='iconfont' value="emoji" size='24' color='#888'></AtIcon>
              <AtIcon prefixClass='iconfont' value="add" size='24' color='#888'></AtIcon>
            </View>
          </AtInput>
          </AtForm>
        </View>
      </View>
    )
  }
}
export default Message