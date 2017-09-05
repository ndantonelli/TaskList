import React, { Component } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Text, Image, ImageEditor, Dimensions, ImageStore  } from 'react-native';
import { Camera, Permissions } from 'expo';
import { Icon } from 'react-native-elements'

const spacerHeight = (Dimensions.get('window').height - Dimensions.get('window').width) / 2;

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
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            flashType: Camera.Constants.FlashMode.off,
            isPreview: false,
            uri:null
        };
        this.cancelModal = this.cancelModal.bind(this);
        this.snap = this.snap.bind(this);
        this.lovePic = this.lovePic.bind(this);
        this.hatePic = this.hatePic.bind(this);
        this.toggleFlash = this.toggleFlash.bind(this);
        this.toggleFrontBack = this.toggleFrontBack.bind(this);
    }
    
    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
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



    async snap() {
        if (this.camera) {
            console.log('ratios', await this.camera.getSupportedRatiosAsync());
            let uri = await this.camera.takePictureAsync();
            this.setState({uri: uri, isPreview: true});
        }
    }

    toggleFlash(){
        this.setState({
            flashType: this.state.flashType === Camera.Constants.FlashMode.off
              ? Camera.Constants.FlashMode.auto
              : (this.state.flashType === Camera.Constants.FlashMode.auto ? 
                    Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off
                ),
          });
    }

    toggleFrontBack(){
        this.setState({
            type: this.state.type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back,
          });
    }

    getFlashIcon(){
        if(this.state.flashType === Camera.Constants.FlashMode.off){
            return 'flash-off';
        }
        if(this.state.flashType === Camera.Constants.FlashMode.auto){
            return 'flash-auto';
        }
        return 'flash-on';
    }

    getCameraTypeIcon(){
        if(this.state.type === Camera.Constants.Type.back){
            return 'camera-front';
        }
        return 'camera-rear';
    }

    renderCamera(){
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
          return <View />;
        } else if (hasCameraPermission === false) {
          return <Text>No access to camera</Text>;
        } else if(this.state.isPreview){
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
        }else {
          return (
            <View style={styles.container}>
                <View style={{height:spacerHeight}}>
                    <TouchableOpacity style={styles.backButton} onPress={this.cancelModal}>
                        <Icon name='chevron-left' color='white' size={36}/>
                    </TouchableOpacity>
                </View>
                <Camera style={styles.camera} type={this.state.type} flashMode={this.state.flashType} ref={ref => { this.camera = ref; }} ratio='1:1'/>

                <View style={{justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
                    <TouchableOpacity style={[styles.button, styles.spacer]} onPress={this.toggleFrontBack}>
                        <Icon name={this.getCameraTypeIcon()} color='white'/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.spacer]} onPress={this.snap}>
                        <Icon name='camera' color='white' size={80}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.spacer]} onPress={this.toggleFlash}>
                        <Icon name={this.getFlashIcon()} color='white'/>
                    </TouchableOpacity>
                </View>
            </View>
          );
        }
    }
    render() {
        const {visibility} = this.props;
        if(visibility){
            return (
                <Modal animationType="slide"
                    onRequestClose={this.cancelModal}
                    transparent={false}
                    visible={visibility}>
                    {this.renderCamera()}
                </Modal>
            );
        }
        else{
            return null;
        }
    }
}