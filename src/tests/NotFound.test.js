import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Test component NotFound', () => {
  it('Página contém h2 com o texto "Page requested not found 😭"', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    expect(getByRole('heading').textContent).toBe('Page requested not found 😭');
  });

  it('Página contém imagem gif', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);

    expect(getAllByRole('img')[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
