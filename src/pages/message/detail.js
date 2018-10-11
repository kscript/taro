import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { AtGrid, AtButton, AtInput, AtForm, AtIcon } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { dataMapState, setActions} from '../../utils'
import List from './list'
import { getSessionList, getHistory, onmessage, sendMessage, detail } from '../../redux/actions/sdk'

import './detail.scss'

@connect(({ sdk }) => ({
  sdk
}), dispatch => setActions(
    [getSessionList, getHistory, onmessage, sendMessage, detail],
    ['getSessionList', 'getHistory', 'onmessage', 'sendMessage','detail'],
    dispatch
))

export default class Message extends Component {
  constructor() {
    console.log(this)
    super(...arguments)
    this.$data = {
      sending: false, //发送消息状态
      scrollHeight: 0, 
      boxHeight: 0,
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
          limit: 100, // 每次加载条数
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
      sessions: {},
      newSessions: {},
      scrollTop: 4,
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
    if(!this.$data.detail.init){
      this.getHistory();
    }
  }

  componentWillMount () {
    let history = this.$data.detail.history;
    history.to = this.$router.params.to;
    this.onmessage();
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
  onmsg(data){
    this.addMessage(data)
  }
  onmessage(){
    this.props.onmessage({
      events: ['onmsg'],
      eventBus: (type, data) => {
        console.log(type, data);
        this[type] && this[type](data)
      }
    })
  }
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
  selectTalk(){

  }
  scrollViewInit(){
    if(!this.$data.detail.init){
      if(this.refs.scrollView){
        this.$data.detail.init = true;
        this.refs.scrollBox.boundingClientRect(data => {
          data && (this.$data.boxHeight = data.height);
        }).exec();
        this.refs.scrollView.boundingClientRect(data => {
          this.$data.rects = data;
          this.$data.scrollCallback && this.$data.scrollCallback(data);
        }).exec();
      }
    } else {
      this.refs.scrollView.boundingClientRect().exec();
    }
  }
  scrollHandler(location, callback, data){
    let height = 0;
    data = data || this.$data.rects;
    if(!data) return;
    if (location === 'history') {
      height = data.height - this.$data.scrollHeight;
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
  getHistory(){
    let detail = this.$data.detail;
    let history = detail.history;
    // 如果是 加载中 / 已全部加载 / 消息数溢出
    if(history.loadState || history.complete || history.overflow)return ;
    history.loadState = 1;
    this.setState({
      loadState: 1
    }, () => {
      this.props.getHistory(history)
        .then(data => {
          if(data.msgs && data.msgs.length){
            let space = history.max - history.limit - history.count - (detail.sessions.msgs || []).length;
            // 超出剩余空间 为 溢出
            history.overflow = data.msgs.length < space;
            // 小于预期时 为 加载完成
            history.complete = data.msgs.length < history.limit;
            data.msgs = data.msgs.concat(detail.sessions.msgs || []);
            detail.sessions = data;
            history.lastMsgId = data.msgs[0].idServer;
            history.endTime = data.msgs[0].time;
            this.setState({
              sessions: detail.sessions,
              loadState: 0
            }, () => {
              this.$data.scrollCallback = () => {
                this.scrollHandler('bottom');
              }
              this.scrollViewInit();
            })
          }else{
            history.complete = true;
            this.setState({
              loadState: 0
            }, () => {
              this.$data.detail.history.loadState = 0;
            })
          }
        });
    })
  }
  
  render () {
    return (
      <View className='detail'>
        <View className="grid-box">
          <AtGrid data={this.state.grid} hasBorder={false} columnNum={4} onClick={this.gridClick} />
        </View>
        <ScrollView
          ref="scrollBox"
          className="scrollview message-list"
          style={"white-space:nowrap;height: " + (this.state.scrollHeight === 0 ? "100vh" : '100vh')}
          scrollY
          scrollWithAnimation={false}
          upperThreshold={10}
          scrollTop={this.state.scrollTop}
          onScrollToUpper={this.getHistory.bind(this)}
          onScrolltoupper={this.getHistory.bind(this)}
          >
            <View ref="scrollView">
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
