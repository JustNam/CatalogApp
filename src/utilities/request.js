export const callAPI = async (enpoint) => {
  const response = await fetch(enpoint);
  const json = await response.json();
  return json;
};
