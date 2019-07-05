import configureStore from 'redux-mock-store';
import { login, signUp } from '../user';
import { LOGIN, SIGNUP } from '../../constants/actionTypes';
import { callAPI } from '../../utilities/request';

const mockStore = configureStore();

describe('User actions', () => {
  const store = mockStore();
  beforeEach(() => {
    store.clearActions();
  });

  it('should dispatch new LOGIN action', async () => {
    const payload = {
      username: 'test',
      password: 'test',
    };
    store.dispatch(
      login(payload)
    );
    const actions = store.getActions();
    expect(actions[0]).toMatchObject({
      type: LOGIN,
      promise: callAPI('/login', 'POST', payload),
    });
  });
  it('should dispatch new SIGNUP action', async () => {
    const payload = {
      username: 'test',
      password: 'test',
    };
    store.dispatch(
      signUp(payload)
    );
    const actions = store.getActions();
    expect(actions[0]).toMatchObject({
      type: SIGNUP,
      promise: callAPI('/users', 'POST', payload),
    });
  });
});