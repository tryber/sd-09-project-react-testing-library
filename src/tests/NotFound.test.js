import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../components';

test('if page contains h2 with Page Requested not found text', () => {
  const { getByRole } = renderWithRouter(<NotFound />);
  expect(getByRole('heading', { level: 2 })).toBeInTheDocument();
  expect(getByRole('heading',
    { level: 2 })).toHaveTextContent('Page requested not found 😭');
});

test('if it shows a specific image', () => {
  const { getByRole } = renderWithRouter(<NotFound />);
  const image = getByRole('img', {
    name: 'Pikachu crying because the page requested was not found' });

  expect(image).toBeInTheDocument();
  expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
