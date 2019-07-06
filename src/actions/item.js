import {
  GET_ITEMS_IN_CATEGORY,
  GET_ITEM_IN_CATEGORY,
  CREATE_ITEM_IN_CATEGORY,
  EDIT_ITEM_IN_CATEGORY,
  DELETE_ITEM_IN_CATEGORY,
  GET_ITEMS_IN_CATEGORY_WITH_PAGINATION,
} from 'constants/actionTypes';
import { callAPI } from '../utilities/request';

export const getItemsInCategory = categoryId => ({
  type: GET_ITEMS_IN_CATEGORY,
  categoryId,
  promise: callAPI(`/categories/${categoryId}/items`, 'GET'),
});

export const getItemsInCategoryWithPagination = (categoryId, page) => ({
  type: GET_ITEMS_IN_CATEGORY_WITH_PAGINATION,
  categoryId,
  promise: callAPI(`/categories/${categoryId}/items?page=${page}`, 'GET'),
});

export const getItemInCategory = (categoryId, itemId) => ({
  type: GET_ITEM_IN_CATEGORY,
  promise: callAPI(`/categories/${categoryId}/items/${itemId}`, 'GET'),
});

export const createItemInCategory = (categoryId, payload) => ({
  type: CREATE_ITEM_IN_CATEGORY,
  promise: callAPI(`/categories/${categoryId}/items`, 'POST', payload),
});

export const editItemInCategory = (categoryId, payload) => ({
  type: EDIT_ITEM_IN_CATEGORY,
  promise: callAPI(
    `/categories/${categoryId}/items/${payload.id}`,
    'PUT',
    payload
  ),
});

export const deleteItemInCategory = (categoryId, itemId) => ({
  type: DELETE_ITEM_IN_CATEGORY,
  promise: callAPI(`/categories/${categoryId}/items/${itemId}`, 'DELETE'),
});
