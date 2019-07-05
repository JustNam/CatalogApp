import { initalItemState } from '../../utilities/state';
import { GET_ITEMS_IN_CATEGORY,
  GET_ITEM_IN_CATEGORY,
  GET_ITEMS_IN_CATEGORY_WITH_PAGINATION,
  CREATE_ITEM_IN_CATEGORY,
} from '../../constants/actionTypes';
import itemReducer from '../item';
import { noDescriptionItem } from '../../utilities/sampleData';

it('It should assign new data to state', () => {
  const newState = itemReducer(undefined, {
    type: GET_ITEMS_IN_CATEGORY,
    payload: {
      data: 'test',
    },
  });
  expect(newState.data).toBe('test');
});
it('It should assign empty array to state when there is no data in action', () => {
  const newState = itemReducer(initalItemState, {
    type: GET_ITEMS_IN_CATEGORY,
    payload: {
    },
  });
  expect(newState.data).toMatchObject([]);
});
it('It should assign new data to state', () => {
  const newState = itemReducer(undefined, {
    type: GET_ITEMS_IN_CATEGORY_WITH_PAGINATION,
    payload: {
      data: {
        items: [noDescriptionItem.data[0]],
        current_page: 1,
        last_page: 2,
        categoryId: 2,
      },
    },
  });
  expect(newState.data).toMatchObject(
    [{
      category: {
        created_on: '06/04/2019, 16:16:33',
        id: 1,
        name: 'Running',
        updated_on: '06/04/2019, 16:29:01',
      },
      created_on: '06/04/2019, 16:29:43',
      id: 7,
      title: 'Ru4',
      updated_on: '07/02/2019, 22:08:02',
      user: { id: 1, username: 'nam123' },
    }]);
});
it('It should assign empty array to state when there is no data in action', () => {
  const newState = itemReducer(undefined, {
    type: GET_ITEMS_IN_CATEGORY_WITH_PAGINATION,
    payload: {
    },
  });
  expect(newState.data).toMatchObject([]);
});

it('It should assign new data to state', () => {
  const newState = itemReducer(undefined, {
    type: GET_ITEM_IN_CATEGORY,
    payload: {
      data: 'test',
    },
  });
  expect(newState.data).toMatchObject(['test']);
});

it('It should assign empty array to state when there is no data in action', () => {
  const newState = itemReducer(undefined, {
    type: GET_ITEM_IN_CATEGORY,
    payload: {
    },
  });
  expect(newState.data).toMatchObject([]);
});

it('It should return the current state if the action does not have specific way to process', () => {
  const newState = itemReducer(initalItemState, {
    type: CREATE_ITEM_IN_CATEGORY,
    payload: {
    },
  });
  expect(newState).toMatchObject(initalItemState);
});