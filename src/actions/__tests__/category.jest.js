import configureStore from 'redux-mock-store';
import { getCategories } from 'actions/category';
import { GET_CATEGORIES } from 'constants/actionTypes';
import { callAPI } from 'utilities/request';

const mockStore = configureStore();

describe('Category actions', () => {
  const store = mockStore();
  it('should dispatch new GET_CATEGORIES action', async () => {
    await store.dispatch(
      getCategories()
    );
    const actions = store.getActions();
    expect(actions[0]).toMatchObject({
      type: GET_CATEGORIES,
      promise: callAPI('/categories', 'GET'),
    });
  });
});