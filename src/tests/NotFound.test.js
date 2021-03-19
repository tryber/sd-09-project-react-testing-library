import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa o component NotFound', () => {
  test('Testa se página contém o texto Page requested not found', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    const notFound = getByRole('heading', {
      level: 2,
      name: (/Page requested not found/i),
    });

    expect(notFound).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem de nao encontrado', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const imgUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const altText = 'Pikachu crying because the page requested was not found';

    const notFound = getByAltText(altText);
    expect(notFound).toBeInTheDocument();
    expect(notFound.src).toBe(imgUrl);
  });
});
