import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtForm, AtButton, AtToast, AtList, AtListItem } from "taro-ui"
import { connect } from '@tarojs/redux'
import { store } from '../../redux'
import { login } from '../../redux/actions/sdk'
import { dataMapState, setActions} from '../../utils'
import { getSessionList, sessions, detail, addEventListener } from '../../redux/actions/sdk'

import './index.scss'

@connect(({ sdk }) => ({
  sdk
}), (dispatch) => {
  return {
    getSessionList: option => {
      return dispatch(getSessionList(option))
    },
    sessions: option => {
      return dispatch(sessions(option))
    },
    addEventListener: option => {
      return dispatch(addEventListener(option))
    },
    detail: option => {
      return dispatch(detail(option))
    }
  }
})

export default class Index extends Component {
  constructor() {
    super(...arguments)
    this.$data = {
      loginForm: {
        account: '',
        password: ''
      },
      sessions: {}, // 会话信息散列
      sessionList: [], // 会话信息数组
      roamingList: [], // 漫游会话临时数组
    };
    this.state = {
      sessions: {},
      sessionList: [],
      errMessage: '',
      step: 0, // 0: init 1: login 2: message
      isOpened: false,
      show: false
    }
  }
  config = {
    navigationBarTitleText: '首页'
  }
  dataMapState (key, val, fn = () => {}){
    dataMapState.call(this, key, val, () => {
      this.props.sessions(this.$data.sessions)
    });
  }

  // 生命周期
  componentWillReceiveProps (nextProps) {
  }
  componentWillUnmount () {}
  componentWillMount () {
    console.log([this, Taro])
    let state = store.getState()
    if(state.sdk.isLogin && state.sdk.account){
      this.messagePageInit();
    } else {
      this.setState({
        step: 1
      })
    }
  }
  componentDidShow () {
    // console.log("componentDidShow", this)
  }
  

  // 登录相关
  handleInput (stateName, value) {
    this.$data.loginForm[stateName] = value;
  }
  submitLogin(data){
    this.props.login({
      url: 'login',
      method: "post",
      data: data,
      fail: err => {
        this.setState({
          isOpened: true,
          errMessage: err.errMsg
        })
      }
    }).then(data => {
      this.messagePageInit();
    })
  }
  onSubmit(){
    this.submitLogin(this.$data.loginForm);
  }
  toastConfirm(){
    this.setState({
      isOpened: false
    })
  }

  // 聊天相关
  messagePageInit(){
    this.setState({
      step: 2
    })
    Taro.eventCenter.on('sdk.messages', args => {
      let type = args[0];
      this[type] && this[type](args[1]);
    });
    this.props.addEventListener();
  }
  onupdatesession(data){
    this.onsessions(data);
  }
  onsessions(list){
    this.formatSession('onsessions', list);
    this.dataMapState(['sessions','sessionList']);
  }
  onmsg(data){
    this.updateFriendInfo(data);
    this.dataMapState(['sessions','sessionList']);
  }
  updateFriendInfo(data){
    let sessions = this.$data.sessions;
    let list = this.$data.sessionList;
    let account = data[data.flow === 'in' ? 'from' : 'to'];
    let index = -1;
    // 根据账号找到会话对象的位置
    list.forEach((item, index1) => {
      if(item.to === account){
        index = index1
      }
    });
    if(index < 0){
        // 手动设置该会话的信息
        sessions[account] = {
            id: data.sessionId,
            unread: 1,
            scene: "p2p",
            to: account,
            lastMsg: data,
            msgs: [data],
            msgReceiptTime: 0,
            updateTime: data.time,
        };
    } else {
        list.splice(index, 1)[0];
        sessions[account].lastMsg = data;
    }
    // 将当前会话移动到会话列表顶部
    list.unshift(sessions[account]);
    return list;
  }
  // 首页不再管理漫游消息
  onroamingmsgs(data){
    // if(data && data.msgs && !data.lastMsg){
    //   data.lastMsg = data.msgs.slice(-1)[0];
    // }
    // this.$data.roamingList.push(data);
    // setTimeout(() => {
    //   this.formatSession('onroamingmsgs', this.$data.roamingList.splice(0));
    //   this.dataMapState(['sessions','sessionList']);
    // }, 0);
  }
  
  formatSession(type, data){
    if(!(data instanceof Object))return ;
    let sessions = this.$data.sessions;
    let sessionList = this.$data.sessionList;
    let list = data instanceof Array ? data : [data];
    list.forEach(item => {
      if(!sessions[item.to]){
        sessions[item.to] = item;
        sessionList.push(item);

        if(type === 'onroamingmsgs'){
          sessionList = sessionList.sort((a, b) => {
            return sessionList[a].lastMsg.time > sessionList[b].lastMsg.time
          });
        }
      } else {

        let account = item.to;
        sessions[account] = item;
        sessionList.forEach((session, index) => {
          if(session.to === account){
            sessionList[index] = item;
          }
        });
      }
    })
    return sessionList;
  }

  getProfile(account){
    return 
  }

  itemClick(to){
    to && Taro.navigateTo({
      url: '/pages/message/detail?to=' + to
    });
  }
  render () {
    return (
      <View className='index'>
          <AtToast
            hasMask
            isOpened={this.state.isOpened}
            onConfirm={this.toastConfirm}
            text={this.state.errMessage}
          />
          {
            this.state.step === 1
            ? 
              (<View>
                <AtForm className="loginFrom" >
                  <AtInput
                    name="account"
                    type='text'
                    placeholder='请输入账号'
                    value={this.$data.loginForm.account}
                    onChange={this.handleInput.bind(this, 'account')}
                  />
                  <AtInput
                    name="password"
                    type='text'
                    placeholder='请输入密码'
                    value={this.$data.loginForm.password}
                    onChange={this.handleInput.bind(this, 'password')}
                  />
                </AtForm>
                <View className="handler">
                  <AtButton
                  type='primary'
                  size='small'
                  onClick={this.onSubmit.bind(this)}
                  >登录</AtButton>
                </View>
              </View>)
            :
            this.state.step === 2 && 
              <AtList hasBorder={false} className="session-list">
                <AtListItem
                  title='联系人'
                />
                {
                  !this.state.sessionList
                    ? 
                    <AtListItem hasBorder={false} title="" note="暂无消息" /> 
                    :
                    (this.state.sessionList||[]).map(item => {
                      return <AtListItem
                        key="index"
                        title={this.state.sessions[item.to].to}
                        note={this.state.sessions[item.to].lastMsg.text}
                        onClick={this.itemClick.bind(this, item.to)}
                        // extraText='详细信息'
                        thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
                      />
                    })
                }
              </AtList>
          }
    </View>
    )
  }
}
