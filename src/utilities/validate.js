export const validateItemTitle = (title) => {
  const { value } = title;
  const errors = [];
  if (!value.match(/^[a-zA-Z0-9\s]+$/)) {
    errors.push('Given title contains invalid character');
  }
  return {
    value,
    isValid: (errors.length === 0),
    errorMessages: errors,
  };
};

export const validateUsername = (username) => {
  const { value } = username;
  const errors = [];
  if (!value.match(/^[a-zA-Z0-9]+$/)) {
    errors.push('Given username contains invalid character');
  }
  if (!value.length > 30) {
    errors.push('Given username contains more than 30 characters');
  }
  return {
    value,
    isValid: (errors.length === 0),
    errorMessages: errors,
  };
};