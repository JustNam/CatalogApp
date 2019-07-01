import { GET_ITEMS_IN_CATEGORY,
  GET_ITEM_IN_CATEGORY,
  CREATE_ITEM_IN_CATEGORY,
  EDIT_ITEM_IN_CATEGORY,
  DELETE_ITEM_IN_CATEGORY,
} from '../constants/actionTypes';
import { callAPI } from '../utilities/request';

export const getItemsInCategory = categoryId => ({
  type: GET_ITEMS_IN_CATEGORY,
  categoryId,
  promise: callAPI(`http://localhost:5000/categories/${categoryId}/items`, 'GET', true),
});

export const getItemInCategory = (categoryId, itemId) => ({
  type: GET_ITEM_IN_CATEGORY,
  promise: callAPI(`http://localhost:5000/categories/${categoryId}/items/${itemId}`, 'GET', true),
});

export const createItemInCategory = (categoryId, payload) => ({
  type: CREATE_ITEM_IN_CATEGORY,
  promise: callAPI(`http://localhost:5000/categories/${categoryId}/items`, 'POST', true, payload),
});

export const editItemInCategory = (categoryId, payload) => ({
  type: EDIT_ITEM_IN_CATEGORY,
  promise: callAPI(`http://localhost:5000/categories/${categoryId}/items/${payload.id}`, 'PUT', true, payload),
});

export const deleteItemInCategory = (categoryId, itemId) => ({
  type: DELETE_ITEM_IN_CATEGORY,
  promise: callAPI(`http://localhost:5000/categories/${categoryId}/items/${itemId}`, true, 'DELETE'),
});