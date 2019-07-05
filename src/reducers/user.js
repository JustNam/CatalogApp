
import { LOGIN } from '../constants/actionTypes';
import { initalUserState } from '../utilities/state';

export default (state = { ...initalUserState }, action) => {
  switch (action.type) {
    case LOGIN: {
      const { data } = action.payload;
      // If login successfully, save user information in localStorage
      if (data) {
        localStorage.setItem('accessToken', data.access_token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('userId', data.user_id);
        return state;
      }
      return state;
    }
    default:
      return state;
  }
};