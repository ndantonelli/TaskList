import React, { Component } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Text, Image, ImageEditor, Dimensions, ImageStore, Platform  } from 'react-native';
import { Camera, Permissions } from 'expo';
import { Icon } from 'react-native-elements';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const previewHeight = Platform.OS === 'ios' ? width : (width*4/3);
const spacerHeight = Platform.OS === 'ios' ? ((height - width) / 2) : ((height-width*4/3));


const styles = StyleSheet.create({
    container:{ 
        flex: 1, 
        justifyContent:'center', 
        backgroundColor:'black' 
    },
    button:{
        alignItems:'center', 
        justifyContent:'center', 
        height:spacerHeight, 
        width:width / 2
    },
    buttonText:{
        width:width / 2,
        color:'white',
        textAlign:'center',
        marginTop:4
    },
    image:{
        height:previewHeight, 
        width:width,
        resizeMode: 'contain', 
        backgroundColor:'black'
    }
})

export default class Preview extends Component {
    renderSpacer(){
        const {cancelModal} = this.props;
        if(Platform.OS === 'ios'){
            return (
                <View style={{height:spacerHeight}}/>
            );
        }
        return null;
    }
    render() {
        const {uri, hatePic, lovePic} = this.props;
        return(
            <View style={styles.container}>
                {this.renderSpacer()}
                
                <Image style={styles.image} source={{uri: uri}} />

                <View style={{justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
                    <TouchableOpacity style={styles.button} onPress={hatePic}>
                        <View>
                            <Icon name='sentiment-neutral' color='white' size={40}/>
                            <Text style={styles.buttonText}>Nope</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={lovePic}>
                        <View>
                            <Icon name='favorite' color='white' size={40}/>
                            <Text style={styles.buttonText}>Love</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}