import React from 'react';
import { screen } from '@testing-library/react';
import renderWhithRouter from '../components/RenderWithRouter';
import { NotFound } from '../components';

test('Teste se página contém um h2 com o texto `Page requested not found 😭`', () => {
  renderWhithRouter(<NotFound />);

  const heading2 = screen.getByRole('heading', {
    level: 2,
    name: 'Page requested not found Crying emoji',
  });
  expect(heading2).toBeInTheDocument();
});

test('Testa se página contém uma imagem do Pikachu chorando', () => {
  renderWhithRouter(<NotFound />);

  const image = screen.getAllByRole('img');
  expect(image[1]).toBeInTheDocument();
  expect(image[1].src).toBe(
    'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
  );
});
