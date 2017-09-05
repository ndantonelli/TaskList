const types = {
    ADD: 'ADD',
    ADD_PHOTO:'ADD_PHOTO',
    REMOVE: 'REMOVE',
    TOGGLE_COMPLETED: 'TOGGLE_COMPLETED',
    REMOVE_ALL: 'REMOVE_ALL',
    REMOVE_SELECTED: 'REMOVE_SELECTED',
    COMPLETE_SELECTED: 'COMPLETE_SELECTED',
    REMOVE_IMAGE: 'REMOVE_IMAGE'
}

export const actionCreators = {
    add: (item) => {
        return {type: types.ADD, payload: item};
    },
    addPhoto: (obj, index) => {
        return {type: types.ADD_PHOTO, payload: {index:index, photo:obj}};
    },
    remove: (index) => {
        return {type: types.REMOVE, payload: index};

    },
    toggleCompleted: (index) => {
        return {type: types.TOGGLE_COMPLETED, payload: index}
    },
    removeAllCompleted: () => {
        return {type: types.REMOVE_ALL};
    },
    completeSelected: (selectedList) => {
        return {type: types.COMPLETE_SELECTED, payload: selectedList};
    },
    removeSelected: (selectedList) => {
        return {type: types.REMOVE_SELECTED, payload: selectedList};
    },
    removeImage: (index) => {
        return {type: types.REMOVE_IMAGE, payload: index};
    }
}

const sort= (arr) => {
    return arr.sort(function (a,b) {
        if(b.completed && !a.completed){
          return -1;
        }
        if(!b.completed && a.completed){
          return 1;
        }
        if(b.text > a.text){
            return -1;
        }
        if(b.text < a.text){
          return 1;
        }
        return 0;
      });
}

const initialState = {
  items: [],
  anyCompleted: false,
  numCompleted: 0,
}

export const reducer = (state = initialState, action) => {
  const {items, numCompleted, anyCompleted} = state;
  const {type, payload} = action

  switch(type) {
      case 'removeAll':{
        return {
            ...state,
            items: []
        }
      }
    case types.ADD: {
        return {
            ...state,
            items: sort([{text: payload.name.toLowerCase(), completed: false, quantity:payload.quantity, photo:payload.photo}, ...items]),
        }
    }
    case types.ADD_PHOTO: {
        let list = items.map((item, index) => {
            if(index == payload.index){
                item.photo = payload.photo;
            }
            return item
        });
        return {
            ...state,
            items: list,
        }
    }
    case types.TOGGLE_COMPLETED:{
        let num = numCompleted;
        let any = anyCompleted;
        let list = items.map((item,index)=>{
            if(index == payload){
                item.completed = !item.completed;
                if(item.completed){
                    num++;
                    any = true;
                }
                else{
                    num--;
                    any = num != 0;
                }
            }
            return item;
        })
        return {
            ...state,
            anyCompleted: any,
            items: sort(list),
            numCompleted:num
        }
    }
    case types.REMOVE:{
        let num = numCompleted;
        let any = anyCompleted;
        console.log('payload', payload)
        if(items[payload].completed){
            num--;
            any = num != 0;
        }
        let list = items.filter((item, index) => {
            if(item.photo){
                Expo.FileSystem.deleteAsync(item.photo.uri).then( () => {
                    console.log('sucessfully deleted photo');
                });
            }
            return index != payload
        });

        console.log('deleted list:', list);
        return {
            ...state,
            items: list,
            anyCompleted: any,
            numCompleted: num
        }
    }

    case types.REMOVE_IMAGE:{

        let list = items.map((item, index) => {
            if(index == payload && item.photo){
                Expo.FileSystem.deleteAsync(item.photo.uri);
                item.photo = null;
            }
            return item
        });
        return {
            ...state,
            items: list
        }
    }
    case types.REMOVE_ALL:{
        let list = items.filter((item, index) => {
            if(item.completed && item.photo){
                Expo.FileSystem.deleteAsync(item.photo.uri).then( () => {
                    console.log('sucessfully deleted photo');
                });
            }
            return !item.completed
        })
        return {
            ...state,
            items: list,
            anyCompleted: false,
            numCompleted: 0
        }
    }
    case types.REMOVE_SELECTED: {
        let num = numCompleted;
        let any = anyCompleted;
        let list = items.filter((item, index) => {
            if(payload.includes(index) && item.completed){
                num--;
                any = num != 0;
            }
            return !payload.includes(index)
        });
        return {
            ...state,
            items: list,
            anyCompleted: any,
            numCompleted: num
        }
    }
    case types.COMPLETE_SELECTED: {
        let num = numCompleted;
        let any = anyCompleted;
        let list = items.map((item, index) => {
            if(payload.includes(index) && !item.completed){
                item.completed = true;
                num++;
                any = num != 0;
            }
            return item
        });
        return {
            ...state,
            items: sort(list),
            anyCompleted: any,
            numCompleted: num
        }
    }
    default: {
      return state
    }
  }
}
