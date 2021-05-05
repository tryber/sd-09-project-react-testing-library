import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('4. Testa o componente <NotFound.js />', () => {
  it('Testa ha um heading h2 com o texto Page requested not found', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    const heading = getByRole('heading', { level: 2 });
    const notFoundRegex = /Page requested not found/i;
    const notFound = notFoundRegex.test(heading.innerHTML);

    expect(heading).toBeInTheDocument();
    expect(notFound).toBe(true);
  });

  it('Teste se página mostra a imagem giphy.gif', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);

    const altRegex = /Pikachu crying because the page requested was not found/i;
    const img = getByAltText(altRegex);

    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
