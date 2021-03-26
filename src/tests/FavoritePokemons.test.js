import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

test('Renders `No favorite pokemon found` if there are not favorite pokémons', () => {
  const mockPokemons = [];
  renderWithRouter(<FavoritePokemons pokemons={ mockPokemons } />);
  const noFavoritePokemons = screen.getByText(/no favorite pokemon found/i);
  expect(noFavoritePokemons).toBeInTheDocument();
});

// npx stryker run ./stryker/FavoritePokemons.conf.json
