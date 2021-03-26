import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('NotFound', () => {
  it('testa se página contém um heading h2 com o texto Page requested not found', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    expect(getByText('Page requested not found')).toBeInTheDocument();
  });

  it('testa se mostra a imagem', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const imgSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const listRoles = getAllByRole('img');
    expect(listRoles[1]).toHaveAttribute('src', imgSrc);
  });
});

/* Teste se página contém um heading h2 com o texto Page requested not found 😭;

Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.

O que será verificado:

Será avaliado se o arquivo teste NotFound.test.js contemplam 100% dos casos de uso criados pelo Stryker.
*/
