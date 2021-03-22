import React from 'react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Test <FavoritePokemons />', () => {
  test('the message "No favorite pokemon found" is shown if no favorites', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const message = getByText('No favorite pokemon found');

    expect(message).toBeInTheDocument();
  });

  it('shows the cards of all favorite pokemons', () => {
    const {
      getAllByRole,
      getByText,
    } = renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

    const starIcons = getAllByRole('img', {
      name: /is marked as favorite$/i,
    });
    expect(starIcons.length).toBe(pokemons.length);

    pokemons.forEach(({ name }) => (
      expect(getByText(name)).toBeInTheDocument()
    ));
  });

  test('pokemon is not shown if it is not favorite', () => {
    const pokemonsSafeCopy = pokemons.slice();
    const favorites = pokemonsSafeCopy.splice(
      Math.floor(Math.random() * pokemons.length),
      Math.ceil(Math.random() * pokemons.length),
    );

    const {
      getAllByRole,
      getByText,
      queryByText,
    } = renderWithRouter(<FavoritePokemons pokemons={ favorites } />);

    // Favorites are shown
    const starIcons = getAllByRole('img', {
      name: /is marked as favorite$/i,
    });
    expect(starIcons.length).toBe(favorites.length);
    favorites.forEach(({ name }) => (
      expect(getByText(name)).toBeInTheDocument()
    ));

    // Not favorites are not shown
    pokemonsSafeCopy.forEach(({ name }) => (
      expect(queryByText(name)).not.toBeInTheDocument()
    ));
  });
});
