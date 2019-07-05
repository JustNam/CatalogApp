import { convertCamelCaseToSnakeCase } from './string';
import envConfig from '../configurations';

export const convertToRequest = (dict) => {
  const newDict = {};
  Object.keys(dict).forEach((key) => {
    const newKey = convertCamelCaseToSnakeCase(key);
    newDict[newKey] = dict[key];
  });

  return JSON.stringify(newDict);
};

export const callAPI = async (enpoint, method, body, customizedHeaders = {}) => {
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
      // Eliminate fields which is null
      const processedBody = body;
      Object.keys(processedBody).forEach((key) => {
        if (!processedBody[key]) {
          processedBody[key] = '';
        }
      });
      tempBody = convertToRequest(processedBody);
    } else {
      delete headers['Content-Type'];
      tempBody = body;
    }
  } else {
    delete headers['Content-Type'];
  }
  if (localStorage.getItem('accessToken')) {
    headers.authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  }

  const config = {
    method,
    headers,
  };

  // Only allow the other endpoints to assign body
  if (method !== 'GET') {
    config.body = tempBody;
  }

  function handleErrors(response) {
    if (!response.ok) {
      throw response;
    }
    return response;
  }
  const result = await fetch(envConfig.domain.concat(enpoint), config)
    .then(handleErrors)
    .then(response => response.json());
  return result;
};