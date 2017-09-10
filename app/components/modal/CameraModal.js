import React, { Component } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Text, Image, ImageEditor, Dimensions, ImageStore  } from 'react-native';
import { Camera, Permissions } from 'expo';
import { Icon } from 'react-native-elements';
import CameraView from './camera/CameraView';
import Preview from './camera/Preview';

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

    registerUri(uri){
        this.setState({uri: uri, isPreview: true});
    }

    cancelModal(){
        const {toggleModal} = this.props;
        if(this.state.isPreview){
            this.hatePic();
        }
        else{
            this.resetModal();
            toggleModal();
        }
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
        if(this.state.isPreview){
            return(
                <Preview uri={this.state.uri} lovePic={this.lovePic} hatePic={this.hatePic}/>
            )
        }else {
          return (
            <CameraView registerUri={this.registerUri} cancelModal={this.cancelModal}/>
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
                    {this.renderView()}
                </Modal>
            );
        }
        else{
            return null;
        }
    }
}