import { GET_ITEMS_IN_CATEGORY, GET_ITEM_IN_CATEGORY } from '../constants/actionTypes';
import { callAPI } from '../utilities/request';

export const getItemsInCategory = categoryId => ({
  type: GET_ITEMS_IN_CATEGORY,
  categoryId,
  promise: callAPI(`http://localhost:5000/categories/${categoryId}/items`),
});

export const getItemInCategory = (categoryId, itemId) => ({
  type: GET_ITEM_IN_CATEGORY,
  promise: callAPI(`http://localhost:5000/categories/${categoryId}/items/${itemId}`),
});
