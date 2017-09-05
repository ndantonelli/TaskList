import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const styles = StyleSheet.create({
  container:{
    flexDirection:'column',
    flex:1,
  },
  button:{
    flex:.5,
    justifyContent:'center',
    alignItems:'center',
    padding:16
  },

  checkButton:{
      color:'#00E676',
      fontWeight:'bold'
  },
  removeButton:{
    color:'red',
    fontWeight:'bold'
  },
  undoButton:{
    color:'black',
    fontWeight:'bold'
  }
})

export default class ButtonBar extends Component {

    renderCompletedbutton(){
        const {isChecked, onComplete} = this.props;
        if(isChecked){
            return(
                <TouchableOpacity style={styles.button} onPress={onComplete}>
                    <Text style={styles.undoButton}>Undo</Text>
                </TouchableOpacity>
            );
        }
        return(
            <TouchableOpacity style={styles.button} onPress={onComplete}>
                <Text style={styles.checkButton}>Complete</Text>
            </TouchableOpacity>
        );
    }
  render() {
      const {onRemove} = this.props;
    return (
        <View style={styles.container}>
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={[styles.button, styles.buttonLeft]} onPress={onRemove}>
                    <Text style={styles.removeButton}>Remove</Text>
                </TouchableOpacity>
                {this.renderCompletedbutton()}
            </View>
        </View>
    )
  }
}
