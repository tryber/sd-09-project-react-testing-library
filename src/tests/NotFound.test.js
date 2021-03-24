import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('testes do componente NotFound.js', () => {
  test(
    'A página deve conter um heading h2 com o texto Page requested not found 😭', () => {
      const { getByRole } = renderWithRouter(<NotFound />);
      const h2 = getByRole('heading', {
        level: 2, name: 'Page requested not found Crying emoji' });
      expect(h2).toBeInTheDocument();
    },
  );

  test('Teste se a página contém a imagem conforme src correta', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const img = getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(img).toHaveAttribute(
      'src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
