export const convertCamelCaseToSnakeCase = string => (
  string.replace(/[A-Z]/g, match => `_${match.toLowerCase()}`)
);