import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

test('renders a h2 with a Not Found message', () => {
  const { getByRole } = renderWithRouter(<NotFound />);
  const h2 = getByRole('heading', { level: 2, name: /Page requested not found/ });
  expect(h2).toBeInTheDocument();
});

test('renders a image', () => {
  const { getByAltText } = renderWithRouter(<NotFound />);
  const img = getByAltText(/Pikachu crying because/);
  expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
