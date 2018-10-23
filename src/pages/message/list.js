import { Component } from '@tarojs/taro'
import { View, Image} from '@tarojs/components'
import './list.scss'
export default class List extends Component {
  constructor() {
    super(...arguments)
    this.state= {
      msgs: [],
      status: {
        fail: {
          text: '发送失败'
        },
        sending: {
          text: '发送中'
        },
        success: {
          text: '发送成功'
        },
        read: {
          text: "已读"
        }
      }
    }
  }
  
  static options = {
    addGlobalClass: true
  }
  // static externalClasses = ['my-class']
  static defaultProps = {
    sessions: {}
  }
  render(){
    return (
      <View class="com-list">
      {
        (this.props.sessions.msgs || []).map(item => {
          let time = (this.props.sessions.msgReceipt || {}).time;
          let messageStatus = item.status === 'success' ? time >= item.time ? 'read': 'success' : item.status;

          return item.flow === 'in' 
          ?
          <View className="at-row at-row__align--start message-detail" key="index">
            <View className='at-col at-col-1'>
              <View className="photo">
                <Image src="http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png"/>
              </View>
            </View>
            <View className='at-col at-col-10 at-col--wrap'>
              <View className='message-text'>
                {
                  item.nodes.map((node, index) => {
                    return node.type === 'text' ? <View>{node.value}</View> : <Image className="emoji" src={node.value}/>
                  })
                }
              </View>
            </View>
          </View> 
          :
          <View className='at-row at-row__align--end message-detail is-self' key="index">
            <View className='at-col at-col-10 at-col--wrap'>
              <View className='message-text'>
                {
                  item.nodes.map((node, index) => {
                    return node.type === 'text' ? <View>{node.value}</View> : <Image className="emoji" src={node.value}/>
                  })
                }
              </View>
              <View className={"message-status " + messageStatus}>
                {this.state.status[messageStatus].text}
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
    </View>
    )
  }
}