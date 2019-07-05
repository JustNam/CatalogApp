import { initalCategoryState } from '../utilities/state';
import { GET_CATEGORIES } from '../constants/actionTypes';

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
      return state;
    }
    default:
      return state;
  }
};
