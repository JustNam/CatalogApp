import { GET_CATEGORIES } from 'constants/actionTypes';
import { get } from 'utilities/request';

export const getCategories = () => ({
  type: GET_CATEGORIES,
  promise: get('/categories'),
});
