import { validateUsername } from '../validate';

it('It should raise error notify that the length of username is too large and contains invalid character', async () => {
  const username = {
    value: 'LoremIpsumissimplydummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
  };
  const result = validateUsername(username);
  expect(result.errorMessages[0]).toBe('Given username contains invalid character');
  expect(result.errorMessages[1]).toBe('Given username contains more than 30 characters');
});