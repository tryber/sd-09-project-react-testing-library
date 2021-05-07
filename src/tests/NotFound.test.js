import React from 'react';
import renderWithRouter from '../helper/renderWithRouter';
import NotFound from '../components/NotFound';

test('there a h2 heading text: Page requested not found', () => {
  const { getByRole } = renderWithRouter(<NotFound />);
  const headingPageNotFound = getByRole('heading', {
    name: /requested not found/i,
    level: 2,
  });
  expect(headingPageNotFound).toBeDefined();
});
test('there are crying emoji', () => {
  const { getByRole } = renderWithRouter(<NotFound />);
  const emoji = getByRole('img', { name: 'Crying emoji' });
  expect(emoji.textContent).toBe(' 😭');
});
test('there are pikachu crying img', () => {
  const { getByRole } = renderWithRouter(<NotFound />);
  const pikachuCrying = getByRole('img', { name: /Pikachu crying/i });
  expect(pikachuCrying.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
