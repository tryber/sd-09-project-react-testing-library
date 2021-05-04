import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import NotFound from '../components/NotFound';

test('h2 as header', () => {
  const { getByRole } = renderWithRouter(<NotFound />);
  const header = getByRole('heading', { ariaLevel: 2 });
  expect(header).toBeInTheDocument();
  expect(header).toHaveTextContent('Page requested not found 😭');
});

test('pikachu image', () => {
  const { getAllByRole } = renderWithRouter(<NotFound />);
  const pikachu = getAllByRole('img');
  expect(pikachu[1]).toBeInTheDocument();
  expect(pikachu[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
