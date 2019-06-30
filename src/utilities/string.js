export const convertSnakeCaseToCamelCase = string => (
  string.replace(/_[a-z]/g, match => match[1].toUpperCase())
);
export const convertCamelCaseToSnakeCase = string => (
  string.replace(/[A-Z]/g, match => `_${match.toLowerCase()}`)
);