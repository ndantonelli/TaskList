import React, { Component } from 'react';
import { Modal, View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import ModalTitle from './modal/ModalTitle'
import Input from './modal/Input'
import NumInput from './modal/NumInput'
import PicView from './PicView'

const styles = StyleSheet.create({
    container:{
        flex:1, 
        justifyContent:'center',
        backgroundColor:'rgba(0, 0, 0, 0.4)',
        padding:24
    }
})

export default class InputModal extends Component {
    constructor(props,context){
        super(props,context);
        this.state = {
            name: '',
            quantity: 0,
            validName: false
        }
        this.onChangeText = this.onChangeText.bind(this);
        this.cancelModal = this.cancelModal.bind(this);
        this.submitModal = this.submitModal.bind(this);
        this.onDecrementQuantity = this.onDecrementQuantity.bind(this);
        this.onIncrementQuantity = this.onIncrementQuantity.bind(this);
    }

    onChangeText(text){
        let valid = text !== '';
        this.setState({name:text, validName:valid});
    }

    onIncrementQuantity(){
        this.setState({quantity: ++this.state.quantity});
    }

    onDecrementQuantity(){
        this.setState({quantity: --this.state.quantity});
    }

    submitModal(){
        const {addTodo} = this.props;
        if(!this.state.validName){
            return;
        }
        let submitObj = {name:this.state.name, quantity: this.state.quantity};
        this.setState({
            name: '',
            quantity: 0,
            validName:false
        });
        addTodo(submitObj);
    }

    cancelModal(){
        const {toggleModal} = this.props;
        this.setState({
            name: '',
            quantity: 0,
            validName:false
        });
        toggleModal();
    }

    toggleModal(){}
    render() {
        const {visibility, toggleCameraModal} = this.props;
        return (
            <Modal animationType="fade"
                onRequestClose={this.cancelModal}
                transparent={true}
                visible={visibility}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.container}>
                    <View style={{backgroundColor:'white', borderRadius:5, paddingBottom:24}}>
                        <ModalTitle valid={this.state.validName} cancelModal={this.cancelModal} submitModal={this.submitModal}/>
                        <Input placeholder='So what are we doing?' text={this.state.name} valid={this.state.validName} onChangeText={this.onChangeText} submitModal={this.submitModal}/>
                        <NumInput quantity={this.state.quantity} decrement={this.onDecrementQuantity} increment={this.onIncrementQuantity}/>
                        <PicView toggleModal={this.toggleModal}/>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        );
    }
}