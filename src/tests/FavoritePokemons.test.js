import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';

describe('test FavoritePikemons component', () => {
  it('test if `No favorite pokemon found` is shown', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavorites = screen.getByText('No favorite pokemon found');

    expect(noFavorites).toBeInTheDocument();
  });

  it('test if all favorite pokemons are shown', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

    pokemons.forEach((pokemon) => {
      const name = screen.getByText(pokemon.name);

      expect(name).toBeInTheDocument();
    });
  });

  it('test if only favorite pokemons are shown', () => {
    const pokemonsCopy = [...pokemons];
    const removedPokemon = pokemonsCopy.pop();
    renderWithRouter(<FavoritePokemons pokemons={ pokemonsCopy } />);
    const removed = screen.queryByText(removedPokemon.name);

    expect(removed).toBeNull();
  });
});
