import { LOGIN, SIGNUP } from 'constants/actionTypes';
import { callAPI } from 'utilities/request';

export const login = (username, password) => {
  const payload = {
    username,
    password,
  };
  return {
    type: LOGIN,
    promise: callAPI('/login', 'POST', payload),
  };
};

export const signUp = (username, password) => {
  const payload = {
    username,
    password,
  };
  return {
    type: SIGNUP,
    promise: callAPI('/users', 'POST', payload),
  };
};
