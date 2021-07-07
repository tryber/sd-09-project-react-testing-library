import React from 'react';
import NotFound from '../components/NotFound';
import RenderWithRouter from '../services/RenderWithRouter';

describe('Testes do modulo NotFound', () => {
  it('Testa se a página tem o texto "Not Found"', () => {
    const { getByRole } = RenderWithRouter(<NotFound />);
    const errorMessage = getByRole('heading', { ariaLevel: 2 });
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent('Page requested not found 😭');
  });

  it('Testa se a imagem aparece', () => {
    const { getAllByRole } = RenderWithRouter(<NotFound />);
    const image = getAllByRole('img');
    expect(image[1]).toBeInTheDocument();
    expect(image[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
