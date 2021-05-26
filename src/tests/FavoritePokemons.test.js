import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const paragraphs = getByText(/No favorite pokemon found/i);
  expect(paragraphs).toBeInTheDocument();
});

test('Teste se é exibido todos os cards de pokémons favoritados1', () => {
  const { getByRole, getAllByText, getByText } = renderWithRouter(<App />);
  const nextPokemon = getByText('Próximo pokémon');
  fireEvent.click(nextPokemon);
  let moreDetails = getAllByText(/More detail/i);
  fireEvent.click(moreDetails[0]);
  const checkBox = getByRole('checkbox');
  fireEvent.click(checkBox);
  const favoritePokemons = getByText('Favorite Pokémons');
  fireEvent.click(favoritePokemons);
  moreDetails = getAllByText('More details');
  expect(moreDetails.length).toBe(1);
});

test('Teste se é exibido todos os cards de pokémons favoritados2', () => {
  const { getByRole, getAllByText, getByText } = renderWithRouter(<App />);
  let moreDetails = getAllByText(/More detail/i);
  fireEvent.click(moreDetails[0]);
  const checkBox = getByRole('checkbox');
  fireEvent.click(checkBox);
  const favoritePokemons = getByText('Favorite Pokémons');
  fireEvent.click(favoritePokemons);
  moreDetails = getAllByText('More details');
  expect(moreDetails.length).toBe(2);
});

test('', () => {});
