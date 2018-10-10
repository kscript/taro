import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem} from "taro-ui"
import { connect } from '@tarojs/redux'
import { getSessionList, onmessage, detail} from '../../redux/actions/sdk'

import './index.scss'

@connect(() => ({

}), (dispatch) => ({
  onmessage: option => {
    return dispatch(onmessage(option));
  },
  detail: option => {
    return dispatch(detail(option));
  },
  getSessionList: val => {
    return dispatch(getSessionList(val));
  }
}))

export default class Message extends Component {
  constructor() {
    super(...arguments)
    this.$data = {
      sessions: {}, // 会话信息散列
      sessionList: [], // 会话信息数组
      roamingList: [], // 漫游会话临时数组
    };
    this.state = {
      show: false
    }
  }
  config = {
    navigationBarTitleText: '消息'
  }
  dataMapState(key, val){
    if(arguments.length > 1){
      this.setState({
        [key]: val
      });
    } else {
      let maps = {};
      if(key instanceof Array){
        key.forEach(item => {
          maps[item] = this.$data[item]
        })
      } else {
        maps = {
          [key]: this.$data[key]
        }
      }
      this.setState(maps);
    }
  }
  componentWillReceiveProps (nextProps) {
  }

  componentWillUnmount () { }
  componentWillMount () {
    console.log(this);
    this.props.onmessage({
      events: ['onroamingmsgs','onofflinemsgs', 'onmsg', 'onsessions', 'onusers'],
      eventBus: (type, data) => {
        console.log(type, data);
        this[type] && this[type](data)
      }
    })
  }

  componentDidShow () { }
  
  onsessions(list){
    this.formatSession('onsessions', list);
    this.dataMapState('sessionList');
  }
  onmsg(data){
    this.updateFriendInfo(data);
    // this.formatSession('onmsgs', data);
    this.dataMapState('sessionList');
  }
  updateFriendInfo(data){
    let sessions = this.$data.sessions;
    let list = this.$data.sessionList;
    let account = data[data.flow === 'in' ? 'from' : 'to'];
    let index = -1;
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

  onroamingmsgs(data){
    if(data && data.msgs && !data.lastMsg){
      data.lastMsg = data.msgs.slice(-1)[0];
    }
    this.$data.roamingList.push(data);
    setTimeout(() => {
      this.formatSession('onroamingmsgs', this.$data.roamingList.splice(0));
      this.dataMapState('sessionList');
    }, 0);
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
        sessions[item.to] = item;
      }
    })
    return sessionList;
  }
  getProfile(account){
    return 
  }
  itemClick(session){
    let to = session.to;
    Taro.navigateTo({
      url: '/pages/message/detail?to=' + to
    });
  }
  render () {
    return (
      <View className='index'>
          <AtList hasBorder={false}>
            <AtListItem
              title='联系人'
            />
            {!this.state.sessionList ? <AtListItem hasBorder={false} title="" note="暂无消息" /> : (this.state.sessionList||[]).map(item => {
                return <AtListItem
                  title={item.to}
                  note={item.lastMsg.text}
                  key="index"
                  onClick={this.itemClick.bind(this, item)}
                  // extraText='详细信息'
                  thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
                />
              })}
          </AtList>
    </View>
    )
  }
}
