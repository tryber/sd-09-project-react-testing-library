import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

test('A página contém um heading h2 com o texto Page requested not found', () => {
  const { getByRole } = renderWithRouter(<NotFound />);

  expect(getByRole('heading', { level: 2, name: /Page requested not found/i }))
    .toBeInTheDocument();
});

test('A página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
  const { getByAltText } = renderWithRouter(<NotFound />);

  const sadPikachu = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  const getImg = getByAltText('Pikachu crying because the page requested was not found');
  expect(getImg.src).toBe(sadPikachu);
});
