import React from 'react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

describe('Testando o componente <NotFound.js />', () => {
  it('Testa se página contém um heading h2 com texto Page requested not found 😭', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const headingH2 = getByRole('heading', {
      level: 2,
    });

    expect(headingH2.textContent).toBe('Page requested not found 😭');
  });

  it('Teste se página mostra a imagem', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);

    const image = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(getAllByRole('img')[1].src).toBe(image);
  });
});
