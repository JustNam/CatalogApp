import configureStore from 'redux-mock-store';
import {
  getItemsInCategory,
  getItemsInCategoryWithPagination,
  getItemInCategory,
  createItemInCategory,
  editItemInCategory,
  deleteItemInCategory,
} from '../item';
import {
  GET_ITEMS_IN_CATEGORY,
  GET_ITEMS_IN_CATEGORY_WITH_PAGINATION,
  GET_ITEM_IN_CATEGORY,
  EDIT_ITEM_IN_CATEGORY,
  CREATE_ITEM_IN_CATEGORY,
  DELETE_ITEM_IN_CATEGORY,
} from '../../constants/actionTypes';
import { callAPI } from '../../utilities/request';

const mockStore = configureStore();

describe('Item actions', () => {
  const store = mockStore();

  beforeEach(() => {
    store.clearActions();
  });

  it('should dispatch new GET_ITEMS_IN_CATEGORY action', async () => {
    store.dispatch(
      getItemsInCategory(1)
    );
    const actions = store.getActions();
    expect(actions[0]).toMatchObject({
      type: GET_ITEMS_IN_CATEGORY,
      categoryId: 1,
      promise: callAPI('/categories/1/items', 'GET'),
    });
  });

  it('should dispatch new GET_ITEMS_IN_CATEGORY_WITH_PAGINATION action', async () => {
    store.dispatch(
      getItemsInCategoryWithPagination(1, 1)
    );
    const actions = store.getActions();
    expect(actions[0]).toMatchObject({
      type: GET_ITEMS_IN_CATEGORY_WITH_PAGINATION,
      categoryId: 1,
      promise: callAPI('/categories/1/items?page=1', 'GET'),
    });
  });

  it('should dispatch new GET_ITEM_IN_CATEGORY action', async () => {
    store.dispatch(
      getItemInCategory(1, 1)
    );
    const actions = store.getActions();
    expect(actions[0]).toMatchObject({
      type: GET_ITEM_IN_CATEGORY,
      promise: callAPI('/categories/1/items?page=1', 'GET'),
    });
  });

  it('should dispatch new CREATE_ITEM_IN_CATEGORY action', async () => {
    const payload = {
      title: 'test',
      description: 'test',
    };
    store.dispatch(
      createItemInCategory(1, payload)
    );
    const actions = store.getActions();
    expect(actions[0]).toMatchObject({
      type: CREATE_ITEM_IN_CATEGORY,
      promise: callAPI('/categories/1/items', 'POST'),
    });
  });

  it('should dispatch new EDIT_ITEM_IN_CATEGORY action', async () => {
    const payload = {
      title: 'test',
      description: 'test',
    };
    store.dispatch(
      editItemInCategory(1, payload)
    );
    const actions = store.getActions();
    expect(actions[0]).toMatchObject({
      type: EDIT_ITEM_IN_CATEGORY,
      promise: callAPI('/categories/1/items/1', 'PUT'),
    });
  });

  it('should dispatch new DELETE_ITEM_IN_CATEGORY action', async () => {
    store.dispatch(
      deleteItemInCategory(1, 1)
    );
    const actions = store.getActions();
    expect(actions[0]).toMatchObject({
      type: DELETE_ITEM_IN_CATEGORY,
      promise: callAPI('/categories/1/items/1', 'DELETE'),
    });
  });
});