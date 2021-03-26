import React from 'react';
import { render } from '@testing-library/react';

import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';
import renderWithRouter from './helpers';

test('should show `No favorite pokemon found` when not hava favorite pokemons', () => {
  const { getByText } = render(<FavoritePokemons />);

  const noFavoriteMessage = getByText('No favorite pokemon found');
  expect(noFavoriteMessage).toBeInTheDocument();
});

test('should render 0 pokemons card when not hava favorite pokemons', () => {
  const { container } = render(<FavoritePokemons />);

  const favoriteCards = container.getElementsByClassName('favorite-pokemon');
  expect(favoriteCards).toHaveLength(0);
});

test('should render all favorite pokemons card', () => {
  const favoritePokemons = [pokemons[0], pokemons[1]];
  const { container } = renderWithRouter(
    <FavoritePokemons pokemons={ favoritePokemons } />,
  );

  const favoriteCards = container.getElementsByClassName('favorite-pokemon');
  expect(favoriteCards).toHaveLength(2);
});
