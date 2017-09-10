import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Image, Platform } from 'react-native'
import { Icon } from 'react-native-elements'

const imageWidth = 200;
const imageHeight = Platform.OS === 'ios' ? imageWidth : imageWidth*4/3;

const styles = StyleSheet.create({
  addPic:{
    borderStyle:'dashed',
    borderWidth:2,
    borderRadius:4,
    borderColor:'rgba(0, 0, 0, 0.2)',
    justifyContent:'center',
    alignItems:'center',
    marginLeft:22,
    marginRight:22,
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
  },
  image:{
    justifyContent: 'flex-end', 
    width:imageWidth, 
    height:imageHeight, 
    backgroundColor:'black', 
    borderRadius:5
}
})

export default class PicView extends Component {
  constructor(props, context){
    super(props, context);
    this._toggleModal = this._toggleModal.bind(this);
  }

  _toggleModal(){
    const {photo, toggleModal} = this.props;
    toggleModal(photo ? true : false, photo ? photo.uri : null);
  }
  renderPhoto(){
    const {photo, removeImage} = this.props;
    if(photo){
      return (
        <Image style={styles.image} resizeMode={Image.resizeMode.contain} source={{uri:photo.uri}}>
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
    return (
      <TouchableWithoutFeedback onPress={this._toggleModal}>
        <View style={styles.addPic}>
          {this.renderPhoto()}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
