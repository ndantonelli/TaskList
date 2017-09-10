import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import PicView from './PicView'
import ButtonBar from './ButtonBar'
import { Icon } from 'react-native-elements'

const styles = StyleSheet.create({
    itemContainer:{
        paddingLeft:22,
        paddingRight:22,
        paddingTop:12,
        paddingBottom:12,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        minHeight:48
      },
      itemText:{
        fontSize: 18,
        fontWeight: 'bold',
    
      },
      divider:{
        height:1,
        backgroundColor:'rgba(0, 0, 0, 0.2)'
      },
      completedText:{
        textDecorationLine:'line-through',
        color:'grey'
      },
      selected:{
          backgroundColor:'rgba(140,158,255,.2)'
      },
      firstSelected:{
          borderTopRightRadius:5,
          borderTopLeftRadius:5
      },
      lastSelected:{
        borderBottomRightRadius:5,
        borderBottomLeftRadius:5
      }
})

export default class ExpandableItem extends Component {
    constructor(props, context){
        super(props, context);
        this.toggleExpanded = this.toggleExpanded.bind(this);
        this._onComplete = this._onComplete.bind(this);
        this._onRemove = this._onRemove.bind(this);
        this._onLongPress = this._onLongPress.bind(this);
        this._onLayout = this._onLayout.bind(this);
        this._toggleModal = this._toggleModal.bind(this);
        this._removeImage = this._removeImage.bind(this);
    }

    _onLayout(){
        const {index} = this.props;
        const itemRef = 'item' + index;
        this.refs[itemRef].measure((x, y, width, height, pageX, pageY) => {
            this.setState({topY:pageY, bottomY:pageY+height});
        });
    }

    toggleExpanded(){
        const {index, expandedIndex, toggleExpandedItem} = this.props;
        if(index == expandedIndex)
            toggleExpandedItem(-1);
        else
            toggleExpandedItem(index);
    }

    _onRemove(){
        const {index, onRemove} = this.props;
        onRemove(index);
    }

    _onComplete(){
        const {index, onComplete} = this.props;
        onComplete(index);
    }

    _onLongPress(){
        const {index, onSelectItem} = this.props;
        onSelectItem(index);
    }

    renderCheck(completed){
        if(completed){
          return (
            <View>
              <Icon name='check' color='#00E676'/>
            </View>
          );
        }
        return null;
    }
    
    renderDivider(index){
        if(index != 0){
            return (
                <View style={styles.divider}/>
            );
        }
        return null;
    }

    _toggleModal(exists, uri){
        const {index, toggleModal} = this.props;
        toggleModal(index, exists, uri);
    }

    _removeImage(){
        const {index, removeImage} = this.props;
        removeImage(index);
    }

    renderExpandable(){
        const {item, index, expandedIndex} = this.props;
        if(index == expandedIndex){
            return (
                <View>
                    <PicView photo={item.photo} toggleModal={this._toggleModal} removeImage={this._removeImage}/>
                    <ButtonBar onRemove={this._onRemove} 
                        onComplete={this._onComplete} 
                        isChecked={item.completed}/>
                </View>
            );
        }
        else{
            return null;
        }
    }
    render() {
        const {index, item, toUpper, selected, isLast} = this.props;
        const refName = 'item'+index;
        return (

            <View style={[selected ? styles.selected : null, 
                        isLast && selected ? styles.lastSelected : 
                        (selected && index == 0? styles.firstSelected : null)]} 
                ref={refName} 
                onLayout={this._onLayout}>
                {this.renderDivider(index)}
                <TouchableOpacity style={styles.itemContainer} 
                    onPress={this.toggleExpanded} 
                    onLongPress={this._onLongPress}>
                    <Text style={[styles.itemText, item.completed?styles.completedText:null]}>
                        {item.quantity == 0 ? '' : (item.quantity + ' ')}{toUpper(item.text)}
                    </Text>
                    {this.renderCheck(item.completed)}
                </TouchableOpacity>
                {this.renderExpandable(index)}
            </View>
        )
    }
}
