import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testes do componente not found', () => {
  it('Teste se página contém um  h2 com o texto "Page requested not found"', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const heading = getByText('Page requested not found');
    expect(heading).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem com caminho', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const image = getAllByRole('img');
    expect(image[1]).toBeInTheDocument();
    expect(image[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
