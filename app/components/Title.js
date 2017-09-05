import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native'

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#3F51B5',
        height: APPBAR_HEIGHT + STATUSBAR_HEIGHT,
    },
    appBar: {
        height: APPBAR_HEIGHT,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    text:{
        color: 'white',
        fontSize:16,
        fontWeight:'bold'
    },
    statusBar: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        height: STATUSBAR_HEIGHT,
    }
})

export default class Title extends Component {
  render() {
    return (
        <View style={styles.container}> 
            <View style={styles.statusBar}>
                <StatusBar barStyle="light-content"/>
            </View>
            <View style={styles.appBar}>
                <Text style={styles.text}>{this.props.text}</Text>
            </View>
        </View>
    )
  }
}
