import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, StatusBar, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
    container:{
        height:APPBAR_HEIGHT,
        flexDirection:'column', 
        justifyContent:'center',
        borderTopRightRadius:5,
        borderTopLeftRadius:5,
        backgroundColor:'#3F51B5',
    },
    text:{
        color: 'white',
        fontSize:16,
        fontWeight:'bold'
    },
    spacer:{
        flex:.33,
    },
    leftAlign:{
        alignItems:'flex-start',
        justifyContent:'center',
        paddingLeft:16
    },
    rightAlign:{
        alignItems:'flex-end',
        justifyContent:'center',
        paddingRight:16
    },
    center:{
        alignItems:'center',
        justifyContent:'center'
    }
})

export default class ModalTitle extends Component {
  render() {
      const {cancelModal, submitModal, valid} = this.props;
    return (
        <View style={styles.container}>
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={[styles.spacer, styles.leftAlign]} onPress={cancelModal}>
                    <Icon name='close' color='white'/>
                </TouchableOpacity>
                <View style={[styles.spacer, styles.center]}>
                    <Text style={styles.text}>Add</Text>
                </View>
                <TouchableOpacity style={[styles.spacer, styles.rightAlign]} onPress={submitModal} disabled={!valid}>
                    <Icon name='done' color={valid?'white':'rgba(255,255,255,.3)'}/>
                </TouchableOpacity>
            </View>
        </View>
    )
  }
}
