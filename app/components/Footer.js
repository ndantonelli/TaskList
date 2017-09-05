import React, { Component, PropTypes } from 'react'
import { Alert, TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import { Icon } from 'react-native-elements'

const styles = StyleSheet.create({
    container:{
        flex:1, 
        flexDirection:'column', 
        justifyContent:'center'
    },
    button:{
        flex:.6,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF8A80',
        borderRadius:5,
    },
    text:{
        color: 'white',
        fontWeight:'bold',
        paddingTop:12,
        paddingBottom:12,
        backgroundColor:'transparent'
    },
    spacer:{
        flex:.2
    }
})

export default class Footer extends Component {
    _onPressButton() {
        Alert.alert('You tapped the button!')
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{flexDirection:'row'}}>
                    <View style={styles.spacer}/>
                    <TouchableOpacity style={styles.button} onPress={this._onPressButton}>
                        {/* <Icon name='delete-forever' color='red'/> */}
                        <Text style={styles.text}>{this.props.text}</Text>
                    </TouchableOpacity>
                    <View style={styles.spacer}/>
                </View>
            </View>
        )
    }
}
