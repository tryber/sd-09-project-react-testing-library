import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

describe('Componente NotFound.js', () => {
  it('A página deve ter um heading h2 com o texto Page requested not found',
    () => {
    // acessa o elemento
      renderWithRouter(<NotFound />);
      const notFoundText = screen.getByText('Page requested not found', {
        level: 2,
        name: /Page requested not found 😭/i,
      });
      // faça o teste
      expect(notFoundText).toBeInTheDocument();
    });

  it('Se mostra imagem do Pikachu chorando', () => {
    // acessa o elemento
    renderWithRouter(<NotFound />);
    const imageCryingPikachu = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    // faça o teste
    expect((imageCryingPikachu).src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
