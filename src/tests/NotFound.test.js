import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Requisito 04', () => {
  test('Teste se página contém um heading h2 com o texto Page requested not foun', () => {
    const { container } = renderWithRouter(<NotFound />);
    const tagH2 = container.querySelector('h2');
    expect(tagH2).toHaveTextContent(/Page requested not found 😭/i);
  });

  test('Teste se página mostra a imagem', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const imgNotFound = getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(imgNotFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
