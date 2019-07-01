import { GET_CATEGORIES } from '../constants/actionTypes';
import { callAPI } from '../utilities/request';

export const getCategories = () => ({
  type: GET_CATEGORIES,
  promise: callAPI('http://localhost:5000/categories', 'GET', true),
});
