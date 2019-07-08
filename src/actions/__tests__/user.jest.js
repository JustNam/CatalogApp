import configureStore from 'redux-mock-store';
import { login, signUp, logOut } from 'actions/user';
import { LOGIN, SIGNUP, LOGOUT } from 'constants/actionTypes';
import { post } from 'utilities/request';

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
      promise: post('/login', payload),
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
      promise: post('/users', payload),
    });
  });
  it('should dispatch new LOGOUT action', async () => {
    store.dispatch(
      logOut()
    );
    const actions = store.getActions();
    expect(actions[0]).toMatchObject({
      type: LOGOUT,
    });
  });
});