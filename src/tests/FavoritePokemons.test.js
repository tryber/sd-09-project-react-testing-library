import React from 'react';
import { fireEvent } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

afterEach(() => localStorage.clear());

test('A página deve exibir a mensagem No favorite pokemon found', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const heading = getByText(/No favorite pokemon found/);

  expect(heading).toBeInTheDocument();
});

test('Todos os cards dos pokemóns favoritos devem ser exibidos', () => {
  const { getByText, getAllByTestId } = renderWithRouter(<App />);
  const heading = getByText(/More details/);
  const favorite = getByText(/Favorite Pokémons/);
  const allFavorite = getAllByTestId('pokemon-name');

  expect(heading).toBeInTheDocument();
  fireEvent.click(heading);
  const checked = getByText(/Pokémon favoritado?/i);

  expect(checked).toBeInTheDocument();
  fireEvent.click(checked);
  expect(favorite).toBeInTheDocument();
  fireEvent.click(favorite);
  expect(allFavorite.length).toBe(1);
});
