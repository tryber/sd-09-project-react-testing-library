import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Testa componente NotFound.js', () => {
  it('Testa se página possui h2 com mensagem de página não encontrada', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const h2Element = getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });
    expect(h2Element).toBeInTheDocument();
  });

  it('Testa se a aplicação possui uma imagem específica', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const img = getByAltText('Pikachu crying because the page requested was not found');
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
