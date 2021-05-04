import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Test the NotFound.js component', () => {
  test('the page contains an h2 heading', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    expect(getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    })).toBeInTheDocument();
  });

  test('the page contains the exact image', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const img = getByRole('img', {
      name: /Pikachu crying because the page requested was not found/i });
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
