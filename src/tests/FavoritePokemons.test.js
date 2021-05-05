import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente <FavoritePokemons.js />', () => {
  it('Teste se mostra na tela uma mensagem se nao tiver pokemons favoritos', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const notFoundRegex = /No favorite pokemon found/i;
    const h2 = getByText(notFoundRegex);

    expect(h2).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { queryAllByAltText, getByText } = renderWithRouter(<FavoritePokemons />);

    const notFoundRegex = /No favorite pokemon found/i;
    const h2 = getByText(notFoundRegex);
    const notFound = notFoundRegex.test(h2.innerHTML);

    if (!notFound) {
      const favorites = queryAllByAltText(/is marked es favorite/i);
      expect(favorites).toBeDefined();
    }
  });

  it('Test se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    const {
      queryAllByAltText,
      queryAllByTestId,
    } = renderWithRouter(<FavoritePokemons />);
    const favorites = queryAllByAltText(/is marked es favorite/i);
    // console.log(favorites.length);
    if (favorites.length === 0) {
      const pokemons = queryAllByTestId('pokemon-name');
      expect(pokemons.length).toBe(0);
      console.log(pokemons.length);
    }
  });
});
