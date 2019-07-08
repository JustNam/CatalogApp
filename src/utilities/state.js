export const initalCategoryState = {
  data: [],
};

export const initalItemState = {
  data: [],
  categoryId: 0,
  currentPage: 0,
  lastPage: 0,
};

export const initalUserState = {
  loggedIn: localStorage.getItem('accessToken') || false,
};