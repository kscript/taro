import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtForm, AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'
// import { add, minus, asyncAdd } from '../../actions/counter'
import { account, token } from '../../actions/sdk'
import { nim } from '../../utils/'

import './index.scss'

@connect(({ sdk }) => ({
  sdk
}), (dispatch) => ({
  account (val) {
    dispatch(account(val))
  },
  token (val) {
    dispatch(token(val))
  }
}))
export default class Index extends Component {
  constructor() {
    super(...arguments)
    console.log(this, nim)
    this.state = {
      account: '',
      password: ''
    }
  }
  config = {
    navigationBarTitleText: '首页'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this, this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  handleInput(value) {
    this.setState({
      account: value
    })
  }
  onPasswordChange(value) {
    this.setState({
      password: value
    })
  }
  handleInput (stateName, value) {
    this.setState({
      [stateName]: value
    })
  }
  onSubmit(){
    console.log(this, this.state)
  }
  render () {
    return (
      <View className='index'>
          <AtForm className="loginFrom">
            <AtInput
              name="account"
              type='text'
              placeholder='请输入账号'
              value={this.state.account}
              onChange={this.handleInput.bind(this, 'account')}
            />
            <AtInput
              name="password"
              type='text'
              placeholder='请输入密码'
              value={this.state.password}
              onChange={this.handleInput.bind(this, 'password')}
            />
          </AtForm>
          <View class="handler">
            <AtButton
            type='primary'
            size='small'
            onClick={this.onSubmit.bind(this)}
            >登录</AtButton>
          </View>
    </View>
    )
  }
}
