import React from 'react';
import { screen } from '@testing-library/dom';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

it('verify mensage "No favorite pokemon found" if receives an empty array', () => {
  renderWithRouter(<FavoritePokemons pokemons={ [] } />);

  expect(screen.queryByText('No favorite pokemon found')).toBeInTheDocument();
});
