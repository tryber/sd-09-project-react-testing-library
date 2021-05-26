import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import NotFound from '../components/NotFound';

test('Teste se página contém um heading h2 com o texto Page requested not found', () => {
  const { getByRole } = renderWithRouter(<NotFound />);
  const heading = getByRole('heading', { level: 2 });
  expect(heading).toHaveTextContent('Page requested not found');
});

test('Teste se página mostra a imagem', () => {
  const { getAllByRole } = renderWithRouter(<NotFound />);
  const img = getAllByRole('img');
  expect(img[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
