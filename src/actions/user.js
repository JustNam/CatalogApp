import { LOGIN, SIGNUP } from '../constants/actionTypes';
import { callAPI } from '../utilities/request';

export const login = (username, password) => {
  const payload = {
    username, password,
  };
  return ({
    type: LOGIN,
    promise: callAPI('http://localhost:5000/login', 'POST', false, payload),
  });
};

export const signUp = (username, password) => {
  const payload = {
    username, password,
  };
  return ({
    type: SIGNUP,
    promise: callAPI('http://localhost:5000/users', 'POST', false, payload),
  });
};