import { convertCamelCaseToSnakeCase } from './string';

export const convertToRequest = (dict) => {
  const newDict = {};
  Object.keys(dict).forEach((key) => {
    const newKey = convertCamelCaseToSnakeCase(key);
    newDict[newKey] = dict[key];
  });

  return JSON.stringify(newDict);
};

export const callAPI = async (enpoint, method, authorization = false, body, customizedHeaders = {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  const headers = {
    ...defaultHeaders,
    ...customizedHeaders,
  };

  let tempBody;
  if (body) {
    if (headers['Content-Type'] === 'application/json') {
      tempBody = convertToRequest(body);
    } else {
      delete headers['Content-Type'];
      tempBody = body;
    }
  } else {
    delete headers['Content-Type'];
  }
  if (authorization && localStorage.getItem('accessToken')) {
    headers.authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  }

  const config = {
    method,
    headers,
  };

  if (method !== 'HEAD' && method !== 'GET') {
    config.body = tempBody;
  }

  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }
  return fetch(enpoint, config)
    .then(handleErrors)
    .then(response => response.json());
};
