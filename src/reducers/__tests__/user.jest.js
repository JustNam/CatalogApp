import { initalUserState } from '../../utilities/state';
import { LOGIN, SIGNUP } from '../../constants/actionTypes';
import userReducer from '../user';

it('It should assign user creadentials to localStorage', () => {
  localStorage.clear();
  userReducer(undefined, {
    type: LOGIN,
    payload: {
      data: {
        access_token: 'test',
        username: 'username_test',
        user_id: 1,
      },
    },
  });
  expect(localStorage.getItem('accessToken')).toBe('test');
  expect(localStorage.getItem('username')).toBe('username_test');
  expect(localStorage.getItem('userId')).toBe('1');
  localStorage.clear();
});

it('It should not set any item in localStorage when users sign up', () => {
  localStorage.clear();
  userReducer(initalUserState, {
    type: SIGNUP,
    payload: {
    },
  });
  expect(localStorage.getItem('accessToken')).toBe(null);
  expect(localStorage.getItem('username')).toBe(null);
  expect(localStorage.getItem('userId')).toBe(null);
});

it('It should not set any item in localStorage when users login failed', () => {
  localStorage.clear();
  userReducer(initalUserState, {
    type: LOGIN,
    payload: {
    },
  });
  expect(localStorage.getItem('accessToken')).toBe(null);
  expect(localStorage.getItem('username')).toBe(null);
  expect(localStorage.getItem('userId')).toBe(null);
});