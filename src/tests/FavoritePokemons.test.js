import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

const MoreDetails = 'More details';
const favoritePokemons = 'Favorite Pokémons';

beforeEach(() => {
  localStorage.clear();
});

test('No favorite pokemon message', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const text = 'No favorite pokemon found';
  const message = getByText(text);
  expect(message).toBeInTheDocument();
});

test('Showing a favorited pokemon', () => {
  const { getByText, getByRole } = renderWithRouter(<App />);
  const details = getByText(MoreDetails);
  fireEvent.click(details);
  const favBtn = getByRole('checkbox');
  fireEvent.click(favBtn);
  const favLink = getByText(favoritePokemons);
  fireEvent.click(favLink);
  const pokemonName = getByText(/pikachu/i);
  expect(pokemonName).toBeInTheDocument();
});

test('Showing two favorites', () => {
  const { getByText, getByRole } = renderWithRouter(<App />);
  const details = getByText(MoreDetails);
  fireEvent.click(details);
  const favBtn = getByRole('checkbox');
  fireEvent.click(favBtn);
  const home = getByText('Home');
  fireEvent.click(home);
  const fire = getByText('Fire');
  fireEvent.click(fire);
  const details2 = getByText(MoreDetails);
  fireEvent.click(details2);
  const favBtn2 = getByRole('checkbox');
  fireEvent.click(favBtn2);
  const favLink = getByText(favoritePokemons);
  fireEvent.click(favLink);
  const pokemonName = getByText(/pikachu/i);
  const pokemonName2 = getByText(/charmander/i);
  expect(pokemonName).toBeInTheDocument();
  expect(pokemonName2).toBeInTheDocument();
});

test('No favorites selected', () => {
  const { getByText } = renderWithRouter(<App />);
  const favLink = getByText(favoritePokemons);
  fireEvent.click(favLink);
  const text = 'No favorite pokemon found';
  const message = getByText(text);
  expect(message).toBeInTheDocument();
});
