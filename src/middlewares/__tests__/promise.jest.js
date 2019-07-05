import configureStore from 'redux-mock-store';
import promiseMiddleware from '../promise';
import { getCategories } from '../../actions/category';

const mockStore = configureStore([promiseMiddleware]);

describe('Middlewares', () => {
  const store = mockStore();

  beforeEach(() => {
    store.clearActions();
  });

  it('It should resolve the promise in the action', async () => {
    await store.dispatch(
      {
        type: 'TEST',
        promise: Promise.resolve('test'),
      }
    );
    const action = store.getActions();
    expect(action[0]).toMatchObject({
      type: 'TEST',
      payload: {
        data: 'test',
      },
    });
  });

  it('It should pass the action which does not contain promise', async () => {
    await store.dispatch(
      {
        type: 'TEST',
        data: 'test',
      }
    );
    const action = store.getActions();
    expect(action[0]).toMatchObject({
      type: 'TEST',
      data: 'test',
    });
  });

  it('It should resolve the promise and return an action contains error response', async () => {
    await store.dispatch(
      getCategories()
    );
    const action = store.getActions();
    expect(action[0]).toMatchObject({
      type: 'GET_CATEGORIES',
    });
    expect(action[0].payload).toHaveProperty('error');
  });
});