import React, { Component, PropTypes } from 'react'
import { Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'

const styles = StyleSheet.create({
    container:{
        marginLeft:16,
        marginRight:16,
        marginTop:8,
        marginBottom:8,
        backgroundColor:'white',
        borderRadius:5,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    rowContainer:{
        flexDirection:'row', 
        alignItems:'center'
    },
    divider:{
        height:1,
        backgroundColor:'rgba(0, 0, 0, 0.2)'
    },
    icon:{
        paddingLeft:16,
        paddingRight:16,
        paddingTop:12,
        paddingBottom:12,
    },
    text:{
        color:'rgba(0, 0, 0, 0.84)',
        fontSize:14,
        fontWeight:'600',
        paddingRight:12,
        alignItems: 'center'
    },
    disabled:{
        color:'rgba(0, 0, 0, 0.3)'
    }
})

export default class Input extends Component {
    constructor(props, context) {
        super(props, context);
        this.alertDeleteCompleted = this.alertDeleteCompleted.bind(this);
        this.alertDeleteSelected = this.alertDeleteSelected.bind(this);
      }

    alertDeleteCompleted(){
        const {onRemoveCompleted} = this.props;
        Alert.alert(
            'Remove Completed Tasks',
            'Are you sure that you want to remove all of them?',
            [
              {text: 'Cancel'},
              {text: 'Fuck It', onPress: () => {onRemoveCompleted()}},
            ]
          )
    }

    alertDeleteSelected(){
        const {onRemoveCompleted} = this.props;
        Alert.alert(
            'Remove Selected Tasks',
            'Are you sure that you want to remove all of them?',
            [
              {text: 'Cancel'},
              {text: 'Go For It', onPress: () => {onRemoveCompleted()}},
            ]
          )
    }

    renderDivider(){
        return (
            <View style={styles.divider}/>
        );
    }

    renderDelete(){
        const {anyCompleted, anySelected, removeSelected} = this.props;
        if(anySelected){
            return (
                <TouchableOpacity style={styles.rowContainer} onPress={removeSelected}>
                    <Icon style={styles.icon} name='delete-forever' color='red'/>
                    <Text style={styles.text}>Remove selected tasks</Text>
                </TouchableOpacity>
            );
        }
        return (
            <TouchableOpacity style={styles.rowContainer} 
                disabled={!anyCompleted} 
                onPress={this.alertDeleteCompleted}>
                <Icon style={styles.icon} 
                    name='delete-forever' 
                    color={anyCompleted ? 'red' : 'rgba(255,0,0,.3)'}/>
                <Text style={[styles.text, anyCompleted ? null : styles.disabled]}>
                    Remove completed tasks
                </Text>
            </TouchableOpacity>
        );
    }

    renderTop(){
        const {anySelected, onAdd, completeSelected} = this.props
        if(anySelected){
            return(
                <TouchableOpacity style={styles.rowContainer} onPress={completeSelected}>
                    <Icon style={styles.icon} name='done' color='#00E676'/>
                    <Text style={styles.text}>Complete selected tasks</Text>
                </TouchableOpacity>
            );
        }
        return(
            <TouchableOpacity style={styles.rowContainer} onPress={onAdd}>
                <Icon style={styles.icon} name='add' color='#00E676'/>
                <Text style={styles.text}>Add a task</Text>
            </TouchableOpacity>
        );
    }

    render() {
        const {onAdd, anySelected} = this.props;
        return (
            <View style={styles.container}>
                {this.renderTop()}
                {this.renderDivider()}
                {this.renderDelete()}
            </View>
        )
    }
}
