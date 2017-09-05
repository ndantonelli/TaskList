import React, { Component, PropTypes } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'

const styles = StyleSheet.create({
    textStyle:{
        marginLeft:12,
        marginRight:12,
        paddingTop: 24,
        paddingBottom:4,
        paddingLeft:4,
        paddingRight:4,
        marginBottom: 24,
        borderBottomWidth: 1
    },
    valid:{
        borderBottomColor: 'rgba(0, 0, 0, 0.2)'
    },
    invalid:{
        borderBottomColor: 'rgba(255, 0, 0, 0.54)'
    }
})

export default class Input extends Component {

  render() {
    const {placeholder, text, onChangeText, valid, submitModal} = this.props
    return (
        <TextInput
            autoFocus={true}
            style={[styles.textStyle, valid ? styles.valid : styles.invalid]}
            value={text}
            placeholder={placeholder}
            onChangeText={onChangeText}
            onSubmitEditing={submitModal}
            underlineColorAndroid='rgba(0,0,0,0)'
        />
    )
  }
}
