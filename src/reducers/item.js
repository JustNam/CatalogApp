import { initalItemState } from '../utilities/state';
import { GET_ITEMS_IN_CATEGORY,
  GET_ITEM_IN_CATEGORY,
  CREATE_ITEM_IN_CATEGORY,
  EDIT_ITEM_IN_CATEGORY,
  DELETE_ITEM_IN_CATEGORY,
} from '../constants/actionTypes';

export default (state = { ...initalItemState }, action) => {
  switch (action.type) {
    case GET_ITEMS_IN_CATEGORY: {
      const { data } = action.payload;
      const { categoryId } = action;
      if (data) {
        return {
          ...state,
          data,
          categoryId,
        };
      }
      // If the data is empty, it means that the category have no item, set data to null
      return {
        ...state,
        data: [],
        categoryId,
      };
    }
    case GET_ITEM_IN_CATEGORY: {
      const { data } = action.payload;
      if (data) {
        return {
          ...state,
          data: [data],
        };
      }
      return {
        ...state,
        data: [],
      };
    }
    case CREATE_ITEM_IN_CATEGORY: {
      const { data, error } = action.payload;
      if (data) {
        return {
          ...state,
        };
      }
      if (error) {
        console.log(error);
      }
      break;
    }
    case EDIT_ITEM_IN_CATEGORY: {
      const { data, error } = action.payload;
      if (data) {
        return {
          ...state,
        };
      }
      if (error) {
        console.log(error);
      }
      break;
    }
    case DELETE_ITEM_IN_CATEGORY: {
      const { data, error } = action.payload;
      if (data) {
        return {
          ...state,
        };
      }
      if (error) {
        console.log(error);
      }
      break;
    }
    default:
      return state;
  }
  return state;
};
