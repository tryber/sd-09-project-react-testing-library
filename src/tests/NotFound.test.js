import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testa o componente NotFound.js', () => {
  test('Verifica se a página contém um heading h2 "Page requested not found" ', () => {
    render(<NotFound />);

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Page requested not found/i,
      }),
    ).toBeInTheDocument();
  });
});

test('Verifica se a página carrega a imagem ', async () => {
  const { getByAltText } = await render(<NotFound />);
  const image = getByAltText('Pikachu crying because the page requested was not found');
  expect(image.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
