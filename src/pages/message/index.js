import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from "taro-ui"
import { connect } from '@tarojs/redux'
import { getSessionList, onmessage} from '../../redux/actions/sdk'

import './index.scss'

@connect(({ sdk }) => ({
  sdk
}), (dispatch) => ({
  onmessage: option => {
    return dispatch(onmessage(option));
  },
  getSessionList: val => {
    return dispatch(getSessionList(val));
  }
}))
// let model = {}
export default class Message extends Component {
  constructor() {
    super(...arguments)
    this.$data = {
      sessionList: [], // 漫游 + 本地会话列表
      roamingList: [], // 漫游会话临时列表
    };
    this.state = {
    }
  }
  config = {
    navigationBarTitleText: '消息'
  }
  dataMapState(key){
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
  componentWillReceiveProps (nextProps) {
    // console.log(this, this.props, nextProps)
  }

  componentWillUnmount () { }
  componentWillMount () {
    this.props.onmessage({
      eventBus: (type, data) => {
        this[type] && this[type](data)
      }
    })
  }

  componentDidShow () { }
  onroamingmsgs(data){
    this.$data.roamingList.push(data);
    setTimeout(() => {
      this.formatFriends();
    }, 0);
  }
  formatFriends(){
    let roamingList = this.$data.roamingList;
    if(roamingList.length){
      this.$data.sessionList = this.$data.sessionList.concat(roamingList.splice(0));
      this.$data.sessionList.sort((a, b) => {
        return b.timetag - a.timetag
      });
      
      this.dataMapState('sessionList');
    }
  }
  render () {
    return (
      <View className='index'>
          <AtList hasBorder={false}>
            <AtListItem
              title='联系人'
            />
            {this.$data.sessionList.map(item => {
                return <AtListItem
                  title={item.to}
                  note={item.msgs.slice(-1)[0].text}
                  key="index"
                  // extraText='详细信息'
                  thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
                />
              })}
          </AtList>
    </View>
    )
  }
}
