import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        top: 0,
        justifyContent:'center',
        alignItems:'center',
        width:width,
        height:height,
        backgroundColor: 'rgba(0,0,0,.56)'
    }
})

export default class LoadingOverlay extends Component {
    render() {
        const {visibility} = this.props;
        if(visibility){
            return (
                <View style={styles.container}>
                    <ActivityIndicator color='white' size='large' style={{backgroundColor:'transparent'}}/>
                </View>
            );
        }
        return null;
    }
}