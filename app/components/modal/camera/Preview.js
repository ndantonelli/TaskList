import React, { Component } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Text, Image, ImageEditor, Dimensions, ImageStore  } from 'react-native';
import { Camera, Permissions } from 'expo';
import { Icon } from 'react-native-elements';
import CameraView from './camera/CameraView'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const spacerHeight = height - width / 2;

const styles = StyleSheet.create({
    container:{ 
        flex: 1, 
        justifyContent:'center', 
        backgroundColor:'black' 
    },
    camera:{ 
        height:Dimensions.get('window').width, 
        width:Dimensions.get('window').width 
    },
    button:{
        alignItems:'center', 
        justifyContent:'center', 
        height:spacerHeight, 
        width:Dimensions.get('window').width / 2},
    buttonText:{
        width:Dimensions.get('window').width / 2,
        color:'white',
        textAlign:'center',
        marginTop:4
    },
    spacer:{
        flex:.33,
        alignItems:'center',
        justifyContent:'center'
    },
    backButton:{
        flex:1, 
        justifyContent:'center', 
        alignItems:'flex-start',
        padding:16
    },
})

export default class CameraModal extends Component {
    constructor(props,context){
        super(props,context);
        this.state = {
            isPreview: false,
            uri:null
        };
        this.cancelModal = this.cancelModal.bind(this);
        this.lovePic = this.lovePic.bind(this);
        this.hatePic = this.hatePic.bind(this);
        this.registerUri = this.registerUri.bind(this);
    }

    componentWillMount(){
        console.log('component will mount called from modal');
    }

    registerUri(uri){
        this.setState({uri: uri, isPreview: true});
    }

    cancelModal(){
        const {toggleModal} = this.props;
        this.resetModal();
        toggleModal();
    }

    lovePic(){
        const {submitModal, index} = this.props;
        let photoObj = {uri:this.state.uri};
        submitModal(photoObj, index);
        this.resetModal();
    }

    resetModal(){
        this.setState({uri:null, isPreview: false});
    }

    async hatePic(){
        await Expo.FileSystem.deleteAsync(this.state.uri);
        this.resetModal();
    }

    renderView(){
        const { hasCameraPermission } = this.state;
        let w = Dimensions.get('window').width;
        let h = Dimensions.get('window').height;
        let spacerHeight = (h - w)/2;
        return(
            <Image style={{flex:1, alignItems:'flex-end', flexDirection:'row', resizeMode: 'contain', backgroundColor:'black'}} source={{uri: this.state.uri}}>
                <TouchableOpacity style={styles.button} onPress={this.hatePic}>
                    <View>
                        <Icon name='sentiment-neutral' color='white' size={40}/>
                        <Text style={styles.buttonText}>Nope</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={this.lovePic}>
                    <View>
                        <Icon name='favorite' color='white' size={40}/>
                        <Text style={styles.buttonText}>Love</Text>
                    </View>
                </TouchableOpacity>
            </Image>
        )
    }
    render() {
        const {visibility} = this.props;
        if(visibility){
            return (
                <Modal animationType="slide"
                    onRequestClose={this.cancelModal}
                    transparent={false}
                    visible={visibility}>
                    {this.renderView()}
                </Modal>
            );
        }
        else{
            return null;
        }
    }
}