import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('Teste se pág. contém um heading h2 com o texto Page requested not found 😭;', () => {
  render(<NotFound />);
  const h2 = screen.getByRole('heading', {
    level: 2,
    name: /Page requested not found/i,
  });
  expect(h2).toBeInTheDocument();
});

test('Teste se página mostra a imagem', () => {
  render(<NotFound />);
  const containImg = screen.getByAltText(
    'Pikachu crying because the page requested was not found',
  );
  expect(containImg.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
