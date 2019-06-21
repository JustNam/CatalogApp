import * as constants from '../constants/actionTypes';

export function addCategory(category) {
    return {
        TYPE: constants.ADD_CATEGORY,
        category
    }
}

export function loadCategories(){
    return {
        TYPE: constants
    }
}