import React from 'react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Requirement 3', () => {
  test('if the message "No favorite pokemon found" is displayed on the screen', () => {
    const { queryByText } = renderWithRouter(<FavoritePokemons />);

    const noFavoritePokemonMessage = queryByText(/No favorite pokemon found/i);
    expect(noFavoritePokemonMessage).toBeInTheDocument();
  });

  test('if all favorite Pokémon cards are displayed.', () => {
    const { queryAllByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={ pokemons } />,
    );

    const pokemonList = queryAllByTestId('pokemon-name');
    expect(pokemonList.length).toBe(pokemons.length);
  });

  test('if no Pokémon card is displayed, if it is not favored', () => {
    const { queryAllByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={ [] } />,
    );

    const pokemonList = queryAllByTestId('pokemon-name');
    expect(pokemonList.length).toBe(0);
  });
});
