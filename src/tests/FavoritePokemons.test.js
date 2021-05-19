import React from 'react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Requisito 3', () => {
  test('Se é exibido a mensagem "No favorite pokemon found"', () => {
    const { queryByText } = renderWithRouter(<FavoritePokemons />);

    const noFavText = queryByText(/No favorite pokemon found/i);
    expect(noFavText).toBeInTheDocument();
  });

  test('Se é exibido todos os cards de pokémons favoritados', () => {
    const { queryAllByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={ pokemons } />,
    );

    const pokemonList = queryAllByTestId('pokemon-name');
    expect(pokemonList.length).toBe(pokemons.length);
  });

  test('Se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    const { queryAllByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={ [] } />,
    );

    const pokemonList = queryAllByTestId('pokemon-name');
    expect(pokemonList.length).toBe(0);
  });
});
