import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        flex:1,
        marginBottom:48,
        marginTop:24
      },
    text:{
        fontSize:24,
        fontWeight:'bold',
    },
    spacer:{
        flex:.33,
        minHeight:15,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default class NumInput extends Component {
  render() {
    const {quantity, increment, decrement} = this.props
    return (
        <View style={styles.container}>
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={styles.spacer} 
                    disabled={quantity == 0} 
                    onPress={decrement}>
                    <Icon name='remove' color={quantity==0 ? 'rgba(255,0,0,.3)' : 'red'}/>
                </TouchableOpacity>
                <View style={styles.spacer}>
                    <Text style={styles.text}>{quantity}</Text>
                </View>

                <TouchableOpacity style={styles.spacer} onPress={increment}>
                    <Icon name='add' color='#00E676'/>
                </TouchableOpacity>
            </View>
        </View>
    )
  }
}
