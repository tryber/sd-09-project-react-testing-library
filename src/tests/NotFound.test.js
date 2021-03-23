import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found ', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const notFoundPg = getByText(/Page requested not found/i);

    expect(notFoundPg).toBeInTheDocument();
    expect(notFoundPg.localName).toBe('h2');
  });

  it('Teste se página mostra a imagem', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const notFoundImg = getByAltText(/Pikachu crying/i);
    const imgUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(notFoundImg).toBeInTheDocument();
    expect(notFoundImg.getAttribute('src')).toBe(imgUrl);
  });
});
