// eslint-disable-next-line no-unused-vars
const createPromiseMiddleware = dispatch => next => (action) => {
  if (!action.promise) {
    return next(action);
  }
  const { promise, ...rest } = action;
  return action.promise
    .then(data => next({
      ...rest,
      payload: {
        data,
      },
    })
    )
    .catch(error => next({
      ...rest,
      payload: {
        error,
      },
    }));
};

export default createPromiseMiddleware;
