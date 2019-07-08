import { LOGIN, SIGNUP, LOGOUT } from 'constants/actionTypes';
import { post } from 'utilities/request';

export const login = (username, password) => {
  const payload = {
    username,
    password,
  };
  return {
    type: LOGIN,
    promise: post('/login', payload),
  };
};

export const signUp = (username, password) => {
  const payload = {
    username,
    password,
  };
  return {
    type: SIGNUP,
    promise: post('/users', payload),
  };
};

export const logOut = () => ({
  type: LOGOUT,
});