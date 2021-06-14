import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('testes para requisito 4', () => {
  test('verifica se H2 tem texto `Page requested not found 😭`', () => {
    const { getByText } = render(<NotFound />);
    const emoji = getByText('😭');
    const h2 = getByText('Page requested not found');
    expect(h2).toBeInTheDocument();
    expect(emoji).toBeInTheDocument();
  });

  test('verifica se é tem imagem certa', () => {
    const Not = render(<NotFound />);
    const { getByAltText } = Not;
    const imagem = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = getByAltText('Pikachu crying because the page requested was not found');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(imagem);
  });
});
