import { GET_ITEMS_IN_CATEGORY,
  GET_ITEM_IN_CATEGORY,
  CREATE_ITEM_IN_CATEGORY,
  EDIT_ITEM_IN_CATEGORY,
} from '../constants/actionTypes';
import { callAPI } from '../utilities/request';

export const getItemsInCategory = categoryId => ({
  type: GET_ITEMS_IN_CATEGORY,
  categoryId,
  promise: callAPI(`http://localhost:5000/categories/${categoryId}/items`, 'GET'),
});

export const getItemInCategory = (categoryId, itemId) => ({
  type: GET_ITEM_IN_CATEGORY,
  promise: callAPI(`http://localhost:5000/categories/${categoryId}/items/${itemId}`, 'GET'),
});

export const createItemInCategory = (categoryId, payload) => ({
  type: CREATE_ITEM_IN_CATEGORY,
  promise: callAPI(`http://localhost:5000/categories/${categoryId}/items`, 'POST', payload, { 'Content-Type': 'application/json' }),
});

export const editItemInCategory = (categoryId, payload) => ({
  type: EDIT_ITEM_IN_CATEGORY,
  promise: callAPI(`http://localhost:5000/categories/${categoryId}/items/${payload.id}`, 'PUT', payload, { 'Content-Type': 'application/json' }),
});