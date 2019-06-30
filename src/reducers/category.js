import { initalCategoryState } from '../utilities/state';
import { GET_CATEGORIES, CREATE_ITEM_IN_CATEGORY } from '../constants/actionTypes';

export default (state = { ...initalCategoryState }, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      {
        const { data } = action.payload;
        if (data) {
          return {
            ...state,
            data,
          };
        }
      }
      break;
    case CREATE_ITEM_IN_CATEGORY:
    {
      const { data } = action.payload;
      if (data) {
        console.log({
          ...state,
        });
        return {
          ...state,
        };
      }
      break;
    }
    default:
      return state;
  }
  return state;
};
