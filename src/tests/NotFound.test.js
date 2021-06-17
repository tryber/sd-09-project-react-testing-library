import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testando a página NotFound', () => {
  it('Teste se página contém um h2 com o texto Page requested not found', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const notFoundHeading = getByText(/Page requested not found/i);

    expect(notFoundHeading).toBeInTheDocument();
    expect(notFoundHeading.localName).toBe('h2');
  });

  it('Teste se página mostra a imagem', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const notFoundImage = getByAltText(/Pikachu crying/i);
    const notFoundImageURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(notFoundImage).toBeInTheDocument();
    expect(notFoundImage.getAttribute('src')).toBe(notFoundImageURL);
  });
});
