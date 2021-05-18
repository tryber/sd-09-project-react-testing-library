import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

test('shows no favorite pokémons while not selected', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const notFound = getByText(/No favorite pokemon found/);
  expect(notFound).toBeInTheDocument();
});

test('contains cards of favorited pokémons', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const moreDetails = getByText(/More details/);
  fireEvent.click(moreDetails);
  const favorite = getByText(/Pokémon favoritado?/);
  fireEvent.click(favorite);
  history.push('/favorites');
  const pikachu = getByText(/Pikachu/);
  expect(pikachu).toBeInTheDocument();
});
