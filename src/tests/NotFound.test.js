import React from 'react';
import RenderWithRouter from '../services/RenderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa o componente <NotFound.js />', () => {
  test('Verifica se a página contém um h2 com o texto Page requested not found', () => {
    const { getByRole } = RenderWithRouter(<NotFound />);
    const h2 = getByRole('heading', { level: 2 });
    expect(h2).toHaveTextContent('Page requested not found');
  });

  test('Verifica se página mostra a imagem do Pikáchu triste', () => {
    const { getByAltText } = RenderWithRouter(<NotFound />);
    const img = getByAltText(/Pikachu crying because the page requested was not found/i);
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
