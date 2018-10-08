import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtGrid, AtList, AtListItem } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { getSessionList, onmessage} from '../../redux/actions/sdk'

import './detail.scss'

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
    this.$data = {};
    this.state = {
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
    navigationBarTitleText: '与 .... 对话中'
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
  gridClick(){

  }
  render () {
    return (
      <View className='detail'>
        <AtGrid data={this.state.grid} hasBorder={false} columnNum={4} onClick={this.gridClick} />
        <AtList hasBorder={false}>
          <AtListItem
            hasBorder={false}
            title='标题文字'
            thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
          />
        </AtList>
      </View>
    )
  }
}
