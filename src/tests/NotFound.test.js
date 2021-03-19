import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('Should have a heading with "Page requested not found"', () => {
  render(<NotFound />);

  const notFound = screen.getByRole('heading', { name: /page requested not found/i });
  expect(notFound).toBeInTheDocument();
});

test('Should show a image', () => {
  render(<NotFound />);

  const image = screen.getByAltText(/Pikachu crying because the page requested/i);
  expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
