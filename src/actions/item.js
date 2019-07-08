import {
  GET_ITEMS_IN_CATEGORY,
  GET_ITEM_IN_CATEGORY,
  CREATE_ITEM_IN_CATEGORY,
  EDIT_ITEM_IN_CATEGORY,
  DELETE_ITEM_IN_CATEGORY,
  GET_ITEMS_IN_CATEGORY_WITH_PAGINATION,
} from 'constants/actionTypes';
import { get, put, post, remove } from '../utilities/request';

export const getItemsInCategory = categoryId => ({
  type: GET_ITEMS_IN_CATEGORY,
  categoryId,
  promise: get(`/categories/${categoryId}/items`),
});

export const getItemsInCategoryWithPagination = (categoryId, page) => ({
  type: GET_ITEMS_IN_CATEGORY_WITH_PAGINATION,
  categoryId,
  promise: get(`/categories/${categoryId}/items?page=${page}`),
});

export const getItemInCategory = (categoryId, itemId) => ({
  type: GET_ITEM_IN_CATEGORY,
  promise: get(`/categories/${categoryId}/items/${itemId}`),
});

export const createItemInCategory = (categoryId, payload) => ({
  type: CREATE_ITEM_IN_CATEGORY,
  promise: post(`/categories/${categoryId}/items`, payload),
});

export const editItemInCategory = (categoryId, payload) => ({
  type: EDIT_ITEM_IN_CATEGORY,
  promise: put(
    `/categories/${categoryId}/items/${payload.id}`,
    payload
  ),
});

export const deleteItemInCategory = (categoryId, itemId) => ({
  type: DELETE_ITEM_IN_CATEGORY,
  promise: remove(`/categories/${categoryId}/items/${itemId}`),
});
