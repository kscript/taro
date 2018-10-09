import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtForm, AtButton, AtToast } from 'taro-ui'
import { connect } from '@tarojs/redux'
import {store} from '../../redux'
import { login} from '../../redux/actions/sdk'

import './index.scss'

@connect(({ sdk }) => ({
  sdk
}), (dispatch) => ({
  login (option) {
    return dispatch(login(option));
  }
}))
export default class Login extends Component {
  constructor() {
    super(...arguments)
    console.log(this)
    this.$data = {
      loginForm: {
        account: '',
        password: ''
      }
    }
    this.state = {
      errMessage: '',
      isLogin: true,
      isOpened: false
    }
  }
  config = {
    navigationBarTitleText: '首页'
  }

  componentWillReceiveProps (nextProps) {
  }

  componentWillUnmount () { }
  componentWillMount () {
    let state = store.getState()
    if(state.sdk.isLogin && state.sdk.account){
      Taro.navigateTo({
          url: '/pages/message/index'
      });
    } else {
      this.setState({
        isLogin: false
      })
    }

  }

  componentDidShow () {
    // this.onSubmit();
  }

  componentDidHide () { }
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
      Taro.navigateTo({
        url: '/pages/message/index'
      });
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
        !this.state.isLogin && (
          <View>
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
          </View>
        )
      }
    </View>
    )
  }
}