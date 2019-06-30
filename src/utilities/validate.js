export const validateItemTitle = (title) => {
  const { value } = title;
  const errors = [];
  if (!value.match(/^[a-zA-Z0-9\s]+$/)) {
    errors.push('Given title contains invalid character');
  }
  if (value.match(/\s{2}/)) {
    errors.push('Item title must not contain 2 continuous spaces');
  }
  return {
    value,
    isValid: (errors.length === 0),
    errorMessages: errors,
  };
};

export const validateUsername = (username) => {
  const errors = [];
  if (!username.match(/^[a-zA-Z0-9]+$/)) {
    errors.push('Given username contains invalid character');
  }
  if (!username.match(/\s{2}/)) {
    errors.push('Username must not contain 2 continuous spaces');
  }
  if (!username.length > 30) {
    errors.push('Given username contains more than 30 characters');
  }
  const result = username.trim();
  return {
    result,
    errors,
  };
};