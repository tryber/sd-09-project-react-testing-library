import React from 'react';
import renderWithRouter from './renderWithRouter';
import Favorites from '../components/FavoritePokemons';
import pokes from '../data';

describe('Requirement 03', () => {
  it('should render: No favorite pokemon found, when none is selected', () => {
    const { getByText } = renderWithRouter(<Favorites />);
    const noFavorites = getByText(/No favorite pokemon found/i);
    expect(noFavorites).toBeInTheDocument();
  });

  it('should render all favorites', () => {
    const { getByText } = renderWithRouter(<Favorites pokemons={ pokes } />);
    pokes.forEach((monster) => {
      const poke = getByText(monster.name);

      expect(poke).toBeInTheDocument();
    });
  });

  it('should not render cards if there\'s no favorite selected', () => {
    const pokeArray = [];
    const { getByText } = renderWithRouter(<Favorites pokemons={ pokeArray } />);
    const noFavorites = getByText(/No favorite pokemon found/i);
    expect(noFavorites).toBeInTheDocument();
  });
});
