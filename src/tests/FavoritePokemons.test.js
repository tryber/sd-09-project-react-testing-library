import React from 'react';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('testing the favorite pokémons page', () => {
  it('Should shows a message if not exists a favorite pokémons', () => {
    const { getByText } = render(<FavoritePokemons />);
    const message = getByText('No favorite pokemon found');

    localStorage.setItem('favoritePokemonIds', '');

    expect(message).toBeInTheDocument();
  });
  it('Should render all favorited pokémons cards', () => {
    const { getAllByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={ pokemons } />,
    );
    const pokemonsCards = getAllByTestId('pokemon-name');

    expect(pokemonsCards.length).toBe(pokemons.length);
  });
  it('should shows only favorited pokémons', () => {
    const { getByText } = renderWithRouter(
      <FavoritePokemons pokemons={ [] } />,
    );
    const notFoundMessage = getByText('No favorite pokemon found');

    expect(notFoundMessage).toBeInTheDocument();
  });
});
