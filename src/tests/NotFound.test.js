import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Requisito 04 - Testes do NotFound.js', () => {
  it('A página contém um heading h2 com o texto "Page requested not found 😭"', () => {
    const { getByText } = renderWithRouter(<NotFound />);

    const pageNotFoundMessage = getByText(/Page requested not found*/i);

    expect(pageNotFoundMessage).toBeInTheDocument();
  });

  it('A página mostra a imagem "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);

    const pageNotFoundImage = getAllByRole('img');
    const pageNotFoundImageLink = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(pageNotFoundImage[1]).toBeInTheDocument();
    expect(pageNotFoundImage[1].src).toBe(pageNotFoundImageLink);
  });
});
