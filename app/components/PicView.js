import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native'
import { Icon } from 'react-native-elements'

const styles = StyleSheet.create({
  addPic:{
    borderStyle:'dashed',
    borderWidth:2,
    borderRadius:4,
    borderColor:'rgba(0, 0, 0, 0.2)',
    // minHeight:56,
    justifyContent:'center',
    alignItems:'center',
    marginLeft:22,
    marginRight:22,
    // marginBottom:16,
    padding:8
  },
  cameraText:{
    fontSize:10,
    fontWeight:'bold',
    color:'rgba(0, 0, 0, 0.56)'
  },
  removeText:{
    color:'white',
    backgroundColor:'rgba(0,0,0,.3)',
    padding: 12,
    textAlign:'center',
    fontSize:14,
    fontWeight:'bold'
  }
})

export default class PicView extends Component {
  renderPhoto(){
    const {photo, removeImage} = this.props;
    if(photo){
      return (
        <Image style={{justifyContent: 'flex-end', width:200, height:200, backgroundColor:'black', borderRadius:5}} resizeMode={Image.resizeMode.contain} source={{uri:photo.uri}}>
          <TouchableOpacity onPress={removeImage}>
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
        </Image>
      )
    }
    return (
      <View>
        <Icon name='camera-alt' color='rgba(0, 0, 0, 0.56)' size={32}/>
        <Text style={styles.cameraText}>Add Picture</Text>
      </View>
    )
  }
  render() {
    const {toggleModal} = this.props;
    return (
      <TouchableWithoutFeedback onPress={toggleModal}>
        <View style={styles.addPic}>
          {this.renderPhoto()}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}