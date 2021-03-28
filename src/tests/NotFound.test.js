import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Testando componente NotFound', () => {
  it('Teste se página contém um h2 com o texto Page requested not found', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const headingNotFound = getByRole('heading', {
      level: 2, name: /Page requested not/i,
    });
    expect(headingNotFound).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem url', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const img = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imgNotFound = getByAltText(/Pikachu crying because/i);
    expect(imgNotFound.src).toBe(img);
  });
});
