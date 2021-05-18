import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Requisito 03 - Testes do FavoritePokemons.js', () => {
  it('É exibido na tela a mensagem No favorite pokemon found,'
  + ' se a pessoa não tiver pokémons favoritos', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    const noFavoritePokemons = getByText(/No favorite pokemon found/i);

    expect(noFavoritePokemons).toBeInTheDocument();
  });

  it('É exibido todos os cards de pokémons favoritados', () => {
    const { queryAllByAltText } = renderWithRouter(<FavoritePokemons />);

    const favoritePokemonMarked = /is marked as favorite/i;
    expect(queryAllByAltText(favoritePokemonMarked)).toBeDefined();
  });

  it('Nenhum card de pokémon é exibido caso ele não esteja favoritado', () => {
    const { queryByAltText, queryByTestId } = renderWithRouter(<FavoritePokemons />);

    const favoritePokemonMarked = /is marked as favorite/i;
    expect(queryByAltText(favoritePokemonMarked)).not.toBeInTheDocument();

    const pokemonNameId = 'pokemon-name';
    expect(queryByTestId(pokemonNameId)).not.toBeInTheDocument();
  });
});
