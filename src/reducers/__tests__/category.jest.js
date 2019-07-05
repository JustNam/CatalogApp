import categoryReducer from '../category';
import { initalCategoryState } from '../../utilities/state';
import { GET_CATEGORIES } from '../../constants/actionTypes';

it('It should update data feild in state', () => {
  const newState = categoryReducer(undefined, {
    type: GET_CATEGORIES,
    payload: {
      data: 'test',
    },
  });
  expect(newState.data).toBe('test');
});

it('It should decline the udpate when format of the payload is wrong', () => {
  const newState = categoryReducer(initalCategoryState, {
    type: GET_CATEGORIES,
    payload: {
      error: 'test',
    },
  });
  expect(newState.data).toMatchObject([]);
});

it('It should return current state when any other action is dispatched', () => {
  const newState = categoryReducer(initalCategoryState, {
    type: 'GET_CATEGORY',
    payload: {
    },
  });
  expect(newState).toMatchObject(initalCategoryState);
});