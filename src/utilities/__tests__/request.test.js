import { convertToRequest, callAPI } from '../request';

it('It should return correct string', () => {
  const dict = {
    itemId: 1,
    title: 'Shoes',
    originalDescription:
      'A shoe is an item of footwear intended to protect and comfort the human foot while the wearer is doing various activities.',
  };
  expect(convertToRequest(dict)).toBe(
    '{"item_id":1,"title":"Shoes","original_description":"A shoe is an item of footwear intended to protect and comfort the human foot while the wearer is doing various activities."}'
  );
});

it('It should receive access token', async () => {
  const body = {
    username: 'nam123',
    password: 'nam123',
  };
  let response;
  await callAPI('/login', 'POST', body).then((data) => {
    response = { ...data };
  });
  expect(response).toHaveProperty('access_token');
});

it('It should receive correct data', async () => {
  const body = {
    username: 'nam123',
    password: 'nam123',
  };
  await callAPI('/login', 'POST', body).then((data) => {
    localStorage.setItem('accessToken', data.access_token);
  });
  const props = ['created_on', 'id', 'name', 'updated_on', 'user'];
  await callAPI('/categories', 'GET').then((response) => {
    expect(response[0]).toHaveProperty(...props);
  });
});
it('It should handle error when it occurs', async () => {
  const body = '<html></html>';
  await callAPI('/login', 'POST', body, { 'Content-Type': 'text/html' }).catch(
    (error) => {
      expect(error.status).toBe(400);
    }
  );
});
