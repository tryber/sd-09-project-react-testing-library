import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Testando <NotFound />', () => {
  test('Testando H2', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const h2 = getByRole('heading', { level: 2, name: /Page requested not found/i });
    expect(h2).toBeInTheDocument();
  });
  test('Testando se gif é renderizado', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const gif = getByAltText(/pikachu/i);
    expect(gif).toBeInTheDocument();
    expect(gif.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
