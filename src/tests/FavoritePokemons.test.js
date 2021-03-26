import React from 'react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('FavoritePokemons', () => {
  it('testa se é exibido na tela a mensagem No favorite pokemon found.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });
});

/* Teste se é exibido na tela a mensagem No favorite pokemon found, se a pessoa não tiver pokémons favoritos.

Teste se é exibido todos os cards de pokémons favoritados.

Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado.

O que será verificado:

Será avaliado se o arquivo teste FavoritePokemons.test.js contemplam 100% dos casos de uso criados pelo Stryker. */
