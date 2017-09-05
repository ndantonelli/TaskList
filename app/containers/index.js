import React, { Component, PropTypes } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Title from '../components/Title'
import ActionBar from '../components/ActionBar'
import List from '../components/List'
import InputModal from '../components/InputModal'
import CameraModal from '../components/modal/CameraModal'
import { actionCreators } from '../redux/todoRedux'
import { Icon } from 'react-native-elements'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#CFD8DC'
  },
  noContentContainer:{
    flex:1, 
    justifyContent:'center', 
    alignItems:'center'
  },
  noContentTextBig:{
    fontSize:18,
    letterSpacing:4,
    fontWeight:'bold'
  },
  noContentTextSmall:{
    fontSize:14,
    fontWeight:'bold'
  },
})

const mapStateToProps = (state) => ({
  items: state.items,
  anyCompleted: state.anyCompleted
})

class App extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {displayAddModal:false, displayCamerModal:false, displayPreviewModal:false,selected:false, cameraIndex:-1}
    this.onAddTodo = this.onAddTodo.bind(this);
    this.onAddPhoto = this.onAddPhoto.bind(this);
    this.onToggleTodo = this.onToggleTodo.bind(this);
    this.onRemoveCompleted = this.onRemoveCompleted.bind(this);
    this.onRemoveTodo = this.onRemoveTodo.bind(this);
    this.toggleAddModal = this.toggleAddModal.bind(this);
    this.toggleCameraModal = this.toggleCameraModal.bind(this);
    this.itemsSelected = this.itemsSelected.bind(this);
    this.onRemoveSelected = this.onRemoveSelected.bind(this);
    this.onCompleteSelected = this.onCompleteSelected.bind(this);
    this.onRemoveImage = this.onRemoveImage.bind(this);
  }

  onAddTodo(obj){
    const {dispatch} = this.props;
    this.toggleAddModal();
    dispatch(actionCreators.add(obj));
  }

  onAddPhoto(obj, index){
    const {dispatch} = this.props;
    this.toggleCameraModal(-1);
    dispatch(actionCreators.addPhoto(obj, index));
  }

  onToggleTodo(index){
    const {dispatch} = this.props;
    dispatch(actionCreators.toggleCompleted(index));
  }

  onRemoveTodo(index){
    const {dispatch} = this.props;
    dispatch(actionCreators.remove(index));
  }

  onRemoveCompleted(){
    const {dispatch} = this.props;
    if(this.refs.itemList){
      this.refs.itemList.unselectAll();
    }
    dispatch(actionCreators.removeAllCompleted());
  }

  onRemoveSelected(){
    const {dispatch} = this.props;
    dispatch(actionCreators.removeSelected(this.refs.itemList.getSelected()));
    this.refs.itemList.unselectAll();
    this.setState({selected:false});
  }

  onRemoveImage(index){
    const {dispatch} = this.props;
    dispatch(actionCreators.removeImage(index));
  }

  onCompleteSelected(){
    const {dispatch} = this.props;
    dispatch(actionCreators.completeSelected(this.refs.itemList.getSelected()));
    this.refs.itemList.unselectAll();
    this.setState({selected:false});
  }

  toUpperCase(text){
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  toggleAddModal(){
    if(this.refs.itemList)
      this.refs.itemList.toggleExpandedItem(-1);
    this.setState({displayAddModal:!this.state.displayAddModal})
  }

  toggleCameraModal(index){
    this.setState({displayCamerModal:!this.state.displayCamerModal,cameraIndex:index});
  }

  itemsSelected(anySelected){
    if(anySelected && !this.state.selected){
      this.setState({selected:anySelected});
    }
    else if(!anySelected && this.state.selected){
      this.setState({selected:anySelected});
    }
  }

  removeAll(){
    const {dispatch} = this.props;
    dispatch({type:'removeAll'});
  }

  static propTypes = {
    items: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    anyCompleted: PropTypes.bool.isRequired
  }

  renderNoContent(){
    return (
      <View style={styles.noContentContainer}>
        <Icon name='all-inclusive' size={100}/>
        <Text style={styles.noContentTextBig}>Endless</Text>
        <Text style={styles.noContentTextSmall}>Opportunities</Text>
      </View>
    )
  }

  renderList(items){
    if(items.length != 0){
      return(
        <List ref='itemList' 
          list={items} 
          itemsSelected={this.itemsSelected} 
          onToggleItem={this.onToggleTodo} 
          toUpperCase={this.toUpperCase} 
          onRemoveItem={this.onRemoveTodo}
          toggleModal={this.toggleCameraModal}
          removeImage={this.onRemoveImage}/>
      )
    }
    return this.renderNoContent();
  }

  render() {
    const {items, anyCompleted} = this.props;
    return (
        <View style={styles.container}>
          {/* <TouchableOpacity onPress={this.removeAll.bind(this)}>
            <Text style={{fontSize:40, padding:40}}>REMOVE ALL</Text>
          </TouchableOpacity> */}
          <CameraModal visibility={this.state.displayCamerModal} 
            toggleModal={this.toggleCameraModal} 
            index={this.state.cameraIndex}
            submitModal={this.onAddPhoto}
            />
          <InputModal visibility={this.state.displayAddModal} 
            toggleModal={this.toggleAddModal} 
            addTodo={this.onAddTodo}
            toggleCameraModal={this.toggleCameraModal}/>
          <Title text='Endless'/>
          <ActionBar ref='actionBar' 
            anyCompleted={anyCompleted} 
            anySelected={this.state.selected} 
            completeSelected={this.onCompleteSelected} 
            removeSelected={this.onRemoveSelected} 
            onAdd={this.toggleAddModal} 
            onRemoveCompleted={this.onRemoveCompleted}/>
          {this.renderList(items)}
          <View style={{height:8}}/>
        </View>
    )
  }
}

export default connect(mapStateToProps)(App)
