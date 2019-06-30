import { convertCamelCaseToSnakeCase } from './string';

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
      tempBody = convertToRequest(body);
    } else {
      delete headers['Content-Type'];
      tempBody = body;
    }
  } else {
    delete headers['Content-Type'];
  }

  const config = {
    method,
    headers,
  };

  if (method !== 'HEAD' && method !== 'GET') {
    config.body = tempBody;
  }
  const response = await fetch(enpoint, config);
  const json = await response.json();
  return json;
};
