import React, { Component, PropTypes } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, PanResponder, Animated } from 'react-native'
import ExpandableItem from './ExpandableItem'

const styles = StyleSheet.create({
  container:{
    marginLeft:16,
    marginRight:16,
    backgroundColor:'white',
    borderRadius:5,
    flexDirection: 'column',
    justifyContent: 'center'
  },
})

export default class List extends Component {
  constructor(props, context){
    super(props, context);
    this.renderItem = this.renderItem.bind(this);
    this.toggleExpandedItem = this.toggleExpandedItem.bind(this);
    this._onRemove = this._onRemove.bind(this);
    this._onComplete = this._onComplete.bind(this);
    this._onSelectItem = this._onSelectItem.bind(this);
    this._onScroll = this._onScroll.bind(this);
    this.state = {
      expandedItem:-1,
      selectedRows:[],
      anySelected:false,
      contextRow:-1,
      lastDy:0,
      initialY:0,
      offset:0
    };
  }

  componentWillMount() {
    const {list} = this.props;
    this.setState({listSize:list.length});
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => false,
      onMoveShouldSetPanResponderCapture: () => this.state.anySelected,
  
      onPanResponderGrant: (e, gestureState) => {
        this.setState({initialY: gestureState.y0});
      },
  
      onPanResponderMove: (e, gestureState) => {
        let dy = gestureState.dy;
        let nextRow = -1;
        let contextRow = this.state.contextRow;
        if(dy < this.state.lastDy){
          nextRow = contextRow - 1;
          if(nextRow < 0){
            this.setState({lastDy: dy});
            return;
          }

        }
        else{
          nextRow = contextRow + 1;
          if(nextRow == this.props.list.length){
            console.log('cant scroll down');
            this.setState({lastDy: dy});
            return;
          }
        }

        if(this.state.selectedRows.includes(nextRow)){
          this.setState({contextRow: nextRow, lastDy: dy});
          return;
        }

        let itemRef = 'expandableItem' + nextRow;

        if(!this.refs[itemRef]){
          console.log('cant find ref for ' + itemRef);
          this.setState({lastDy: dy});
          return;
        }

        if(dy < this.state.lastDy){
          if(this.state.initialY + dy < (this.refs[itemRef].state.bottomY - this.state.offset)){
            this.setState({selectedRows: [nextRow, ...this.state.selectedRows], contextRow: nextRow, lastDy: dy});
          }
          else{
            this.setState({lastDy: dy});
          }
        }
        else{
          if(this.state.initialY + dy > (this.refs[itemRef].state.topY - this.state.offset)){
            this.setState({selectedRows: [nextRow, ...this.state.selectedRows], contextRow: nextRow, lastDy: dy});
          }
          else{
            this.setState({lastDy: dy});
          }
        }
      },
  
      onPanResponderRelease: (e, {vx, vy}) => {
        this.setState({anySelected:false, contextRow:-1, initialY: -1})
      }
    });
  }

  _onScroll(event){
    this.setState({offset:event.nativeEvent.contentOffset.y});
  }

  toggleExpandedItem(index){
    const {itemsSelected} = this.props;
    if(this.state.selectedRows.length != 0){
      this.setState({selectedRows:[], anySelected:false, contextRow:-1});
      itemsSelected(false);
    }
    else{
      this.setState({expandedItem:index});
    }
  }

  _onRemove(index){
    const {onRemoveItem} = this.props;
    this.setState({expandedItem:-1});
    onRemoveItem(index);
  }

  _onComplete(index){
    const {onToggleItem} = this.props;
    this.setState({expandedItem:-1});
    onToggleItem(index);
  }
  
  _onSelectItem(index){
    const {itemsSelected} = this.props;
    this.setState({expandedItem:-1, selectedRows:[index,...this.state.selectedRows], anySelected:true, contextRow:index});
    itemsSelected(true);
  }

  unselectAll(){
    if(this.state.selectedRows.length != 0){
      this.setState({selectedRows:[], anySelected:false, contextRow:-1});
    }
  }
  getSelected(){
    return this.state.selectedRows;
  }

  renderItem(item, index, isLast){
    const {toUpperCase, toggleModal, removeImage} = this.props;
    const refName = 'expandableItem'+index;
    return(
      <ExpandableItem key={index}
        ref={refName} 
        isLast={isLast}  
        item={item} 
        index={index}
        selected={this.state.selectedRows.includes(index)} 
        onSelectItem={this._onSelectItem} 
        expandedIndex={this.state.expandedItem} 
        toggleExpandedItem ={this.toggleExpandedItem} 
        toUpper={toUpperCase} 
        toggleModal={toggleModal}
        onComplete={this._onComplete} 
        onRemove={this._onRemove}
        removeImage={removeImage}/>
    )
  }

  render() {
    const {list} = this.props;
    return (
      <View {...this._panResponder.panHandlers} style={{flex:1}}>
        <ScrollView onScroll={this._onScroll} scrollEventThrottle={1}>
          <View style={styles.container}>
            {list.map((item,index) => this.renderItem(item, index, (list.length-1 == index)))}
          </View>
        </ScrollView>
      </View>
    )
  }
}
