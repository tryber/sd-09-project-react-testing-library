import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('testa o component notFound', () => {
  it('verifica se a pagina contem o texto Page requested not found 😭', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const heading = getByRole('heading',
      { name: /page requested not found crying emoji/i });
    expect(heading).toBeInTheDocument();
  });

  it('verifica se tem a imagem', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const img = getByAltText('Pikachu crying because the page requested was not found');
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
