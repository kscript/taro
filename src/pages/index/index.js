
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
    this.state = {
      errMessage: '',
      isOpened: false,
      loginForm: {
        account: '',
        password: ''
      }
    }
  }
  config = {
    navigationBarTitleText: '首页'
  }

  componentWillReceiveProps (nextProps) {
    // console.log(this, this.props, nextProps)
  }

  componentWillUnmount () { }
  componentWillMount () {
    if(store.getState().sdk.isLogin){
      this.handleInput('account', 'test1111');
    } else {
      Taro.navigateTo({
        url: '/pages/login/index'
      });
    }

  }

  componentDidShow () {
    this.onSubmit();
  }

  componentDidHide () { }
  handleInput (stateName, value) {
    this.setState((prevState, props) => {
      let {...loginForm} = prevState.loginForm;
      loginForm[stateName] = value;
      return {
        loginForm
      }
    });
  }
  onSubmit(){
    this.props.login({
      url: 'login',
      method: "post",
      data: this.state.loginForm,
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
          <AtForm className="loginFrom">
            <AtInput
              name="account"
              type='text'
              placeholder='请输入账号'
              value={this.state.loginForm.account}
              onChange={this.handleInput.bind(this, 'account')}
            />
            <AtInput
              name="password"
              type='text'
              placeholder='请输入密码'
              value={this.state.loginForm.password}
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
}
