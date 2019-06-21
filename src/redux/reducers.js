import * as constants from '../constants/actionTypes'
import { combineReducers } from 'redux';

function category(state = {}, action){
    switch(action.type){
        case constants.ADD_CATEGORY:
            return state;
        default: return state;
    }
}

const rootReducer = combineReducers({category})

export default rootReducer