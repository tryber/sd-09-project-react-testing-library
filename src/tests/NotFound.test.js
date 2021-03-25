import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

test('testing if the page notFound is correct ', () => {
  const { getByAltText, getByRole } = renderWithRouter(<NotFound />);

  const h2 = getByRole('heading', {
    level: 2,
    name: /Page requested not found/i,
  });
  expect(h2).toBeInTheDocument();
  expect(h2).toHaveTextContent(/Page requested not found 😭/i);

  const img = getByAltText(/Pikachu crying/i);
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
