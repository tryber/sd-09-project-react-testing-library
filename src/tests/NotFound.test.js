import React from 'react';
import renderWithRouter from './RenderWithRouter';
import NotFound from '../components/NotFound';

describe('Testando o componente NotFound.js', () => {
  test('Teste se página contém um heading h2', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const header = getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(header).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const img = getByAltText(/Pikachu crying because the page requested was not found/i);
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
