import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, ScrollView} from '@tarojs/components'
import { AtGrid, AtButton, AtInput, AtForm, AtIcon } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { getSessionList, getHistory, detail} from '../../redux/actions/sdk'

import './detail.scss'

@connect(({ sdk }) => ({
  sdk
}), (dispatch) => ({
  detail: option => {
    return dispatch(detail(option));
  },
  getHistory: option => {
    return dispatch(getHistory(option));
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
      detail: {
        me: {}, // 自己的信息
        current: {}, // 当前会话信息
        sessions: {}, // 当前信息
        resume: {}, // 简历信息
        history: {  // 会话历史记录相关
          to: '',
          max: 999, // 消息列表最多显示条数, 超出则溢出
          limit: 10, // 每次加载条数
          count: 0, // 收到的消息
          endTime: 0, // 最后一条消息的time
          lastMsgId: 0, // 最后一条消息的id
          overflow: false, // 是否溢出
          complete: false, // 是否已全部加载完成
        }
      }
    };
    this.state = {
      sessions: {},
      scrollTop: 0,
      scrollHeight: 0,
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

  componentWillMount () {
    console.log(this);
    let history = this.$data.detail.history;
    history.to = this.$router.params.to;
    this.props.getHistory(this.$data.detail.history).then(data => {
      this.$data.detail.sessions = data;
      this.dataMapState('sessions', data);
    });
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
  
  gridClick(){

  }
  onSubmit(){

  }
  selectTalk(){

  }

  scrollTop(){
    console.log("scrollTop")
  }
  render () {
    return (
      <View className='detail'>
        <View className="grid-box">
          <AtGrid data={this.state.grid} hasBorder={false} columnNum={4} onClick={this.gridClick} />
        </View>

          <ScrollView
          className="scrollview message-list"
          style={"white-space:nowrap;height: " + (this.state.scrollHeight === 0 ? "100vh" : '100vh')}
          scrollTop={this.state.scrollTop}
          upperThreshold={5}
          onScrollToUpper={this.scrollTop.bind(this)}
          scrollY
          scrollWithAnimation
          >
            {
              (this.state.sessions.msgs || []).map(item => {
                return item.flow === 'in' 
                ?
                <View className='at-row at-row__align--start message-detail' key="index">
                  <View className='at-col at-col-1'>
                    <View className="photo">
                      <Image src="http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png"/>
                    </View>
                  </View>
                  <View className='at-col at-col-10 at-col--wrap'>
                    <View className='message-text'>
                      <Text>{item.text}</Text>
                    </View>
                  </View>
                </View> 
                :
                <View className='at-row at-row__align--end message-detail is-self' key="index">
                  <View className='at-col at-col-10 at-col--wrap'>
                    <View className='message-text'>
                      <Text>{item.text}</Text>
                    </View>
                  </View>
                  <View className='at-col at-col-1'>
                    <View className="photo">
                      <Image src="http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png"/>
                    </View>
                  </View>
                </View>
              })
            }
          </ScrollView>

        <View className="editor-box">
          <AtForm>
          <AtInput
            clear
            type='text'
            placeholder='新消息'
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
