import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {store} from '../../redux'

import './index.scss'

export default class Index extends Component {
  constructor() {
    super(...arguments)
  }
  config = {
    navigationBarTitleText: '首页'
  }

  componentWillReceiveProps (nextProps) {
  }

  componentWillUnmount () {}
  componentWillMount () {
    if(store.getState().sdk.isLogin){
      Taro.navigateTo({
        url: '/pages/message/index'
      });
    } else {
      Taro.navigateTo({
        url: '/pages/login/index'
      });
    }

  }

  componentDidShow () {
  }

  componentDidHide () {}
  render () {
    return (
      <View className='index'>
      </View>
    )
  }
}
