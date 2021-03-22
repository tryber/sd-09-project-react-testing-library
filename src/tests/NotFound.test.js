import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Bloco de testes para o componente NotFound.js', () => {
  it('Testa se a página contem um h2 com o texto "Page requested not found 😭"', () => {
    const { getByText } = render(<NotFound />);
    const heading = getByText(/Page requested not found/i);
    expect(heading).toBeInTheDocument();
  });

  it('Testa se a página mostra uma imagem', () => {
    const { getByAltText } = render(<NotFound />);
    const notFoundImage = getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(notFoundImage.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
