import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtForm, AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'
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
      loginForm: {
        account: '',
        password: ''
      }
    }
  }
  config = {
    navigationBarTitleText: '登录'
  }

  componentWillReceiveProps (nextProps) {
    // console.log(this, this.props, nextProps)
  }

  componentWillUnmount () { }
  componentWillMount () {
    this.handleInput('account', 'test1111');
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
      data: this.state.loginForm
    }).then(data => {
      Taro.navigateTo({
        url: '/pages/message/index'
      });
    })
  }
  render () {
    return (
      <View className='index'>
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
