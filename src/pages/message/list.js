import { Component } from '@tarojs/taro'
import { View, Image} from '@tarojs/components'
import './list.scss'
export default class List extends Component {
  constructor() {
    super(...arguments)
  }
  static options = {
    addGlobalClass: true
  }
  static externalClasses = ['my-class']
  render(){
    return (
      <View className="my-class">
      {
        (this.props.list || []).map(item => {
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
                {item.text}
              </View>
            </View>
          </View> 
          :
          <View className='at-row at-row__align--end message-detail is-self' key="index">
            <View className='at-col at-col-10 at-col--wrap'>
              <View className='message-text'>
                {item.text}
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