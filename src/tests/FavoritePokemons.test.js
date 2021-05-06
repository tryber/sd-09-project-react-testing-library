import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

test('shows message `No favorite pokemon found` if has no favorite pokemon', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  expect(getByText('No favorite pokemon found')).toBeInTheDocument();
});

test('shows all cards from favorite pokemons', () => {
  const { getByText, getByLabelText, getAllByTestId } = renderWithRouter(<App />);
  fireEvent.click(getByText('More details'));
  fireEvent.click(getByLabelText('Pokémon favoritado?'));
  fireEvent.click(getByText('Home'));
  fireEvent.click(getByText('Próximo pokémon'));
  fireEvent.click(getByText('More details'));
  fireEvent.click(getByLabelText('Pokémon favoritado?'));
  fireEvent.click(getByText('Favorite Pokémons'));
  expect(getAllByTestId('pokemon-name').length).toBe(2);
});

test('shows no cards if has no favorite pokemons', () => {
  const { queryByTestId } = renderWithRouter(<FavoritePokemons />);
  expect(queryByTestId('pokemon-name')).toBeNull();
});
