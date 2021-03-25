import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

test('teste if the mensage No favorite pokemon found is render', () => {
  const { getByText } = renderWithRouter(<App />);

  const favoritePokemons = screen.getByRole('link', {
    name: 'Favorite Pokémons',
  });
  expect(favoritePokemons).toBeInTheDocument();

  userEvent.click(favoritePokemons);
  const notFoundMsg = getByText(/No favorite pokemon found/i);
  expect(notFoundMsg).toBeInTheDocument();
});

test('test if show the card of favorited pokemons', () => {
  const { getByText, getByTestId, getByRole } = renderWithRouter(<App />);

  const moreDetails = screen.getByText(/More Details/i);

  userEvent.click(moreDetails);
  userEvent.click(getByRole('checkbox'));
  userEvent.click(getByText(/Favorite Pokémons/i));
  expect(getByTestId('pokemon-name')).toBeInTheDocument();
});

test('test if no cards show when render FavoritePokemon', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const noPokemons = getByText(/No favorite pokemon found/i);
  expect(noPokemons).toBeInTheDocument();
});
