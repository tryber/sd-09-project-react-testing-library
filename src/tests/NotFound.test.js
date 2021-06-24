import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testes na pagina NotFound', () => {
  it('Teste se página contém um h2 com o texto Page requested not found', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
  it('Teste se página mostra a imagem', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const imgsrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = getByAltText('Pikachu crying because the page requested was not found');
    expect(img.src).toBe(imgsrc);
  });
});
