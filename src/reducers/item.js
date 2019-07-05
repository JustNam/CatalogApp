import { initalItemState } from '../utilities/state';
import { GET_ITEMS_IN_CATEGORY,
  GET_ITEM_IN_CATEGORY,
  GET_ITEMS_IN_CATEGORY_WITH_PAGINATION,
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
    case GET_ITEMS_IN_CATEGORY_WITH_PAGINATION: {
      const { data } = action.payload;
      const { categoryId } = action;
      if (data) {
        return {
          ...state,
          data: data.items,
          categoryId,
          currentPage: data.current_page,
          lastPage: data.last_page,
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
    default:
      return state;
  }
};
