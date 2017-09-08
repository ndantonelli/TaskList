import React, { Component } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Text, Image, ImageEditor, Dimensions, ImageStore, Platform } from 'react-native';
import { Camera, Permissions } from 'expo';
import { Icon } from 'react-native-elements';
import LoadingOverlay from '../../LoadingOverlay';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const cameraHeight = Platform.OS === 'ios' ? width : width*4/3;
const spacerHeight = Platform.OS === 'ios' ? (height - width / 2) : ((height-width*4/3));


const styles = StyleSheet.create({
    container:{ 
        flex: 1, 
        justifyContent:'center', 
        backgroundColor:'black' 
    },
    camera:{ 
        height:cameraHeight, 
        width:width 
    },
    button:{
        alignItems:'center', 
        justifyContent:'center', 
        height:spacerHeight, 
        width:width / 2},
    buttonText:{
        width:width / 2,
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

export default class CameraView extends Component {
    constructor(props,context){
        super(props,context);
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            flashType: Camera.Constants.FlashMode.off,
            showLoader:false
        };
        this.snap = this.snap.bind(this);
        this.toggleFlash = this.toggleFlash.bind(this);
        this.toggleFrontBack = this.toggleFrontBack.bind(this);
    }
    
    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    async snap() {
        const {registerUri} = this.props;
        if (this.camera) {
            this.setState({showLoader:true});
            let uri = await this.camera.takePictureAsync();
            this.setState({showLoader:true});
            registerUri(uri);
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

    renderSpacer(){
        if(Platform.OS === 'ios'){
            return (
                <View style={{height:spacerHeight}}>
                    <TouchableOpacity style={styles.backButton} onPress={this.cancelModal}>
                        <Icon name='chevron-left' color='white' size={36}/>
                    </TouchableOpacity>
                </View>
            );
        }
        return null;
    }

    renderCamera(){
        const { hasCameraPermission, showLoader } = this.state;
        if (hasCameraPermission === null) {
          return <View />;
        } else if (hasCameraPermission === false) {
          return <Text>No access to camera</Text>;
        } else {
          return (
            <View style={styles.container}>
                {this.renderSpacer()}
                
                <Camera style={styles.camera} type={this.state.type} flashMode={this.state.flashType} ref={ref => { this.camera = ref; }} ratio='4:3'/>

                <View style={{justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
                    <TouchableOpacity style={[styles.button, styles.spacer]} onPress={this.toggleFrontBack}>
                        <Icon style={{height:30}} name={this.getCameraTypeIcon()} color='white'/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.spacer]} onPress={this.snap}>
                        <Icon name='camera' color='white' size={80}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.spacer]} onPress={this.toggleFlash}>
                        <Icon name={this.getFlashIcon()} color='white'/>
                    </TouchableOpacity>
                </View>
                <LoadingOverlay visibility={showLoader}/>
            </View>
          );
        }
    }
    render() {
        return (
            this.renderCamera()
        );
    }
}