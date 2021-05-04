import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('Mensagem No favorite pokemon found, se não tiver pokémons favoritos', () => {
  const { getByText } = render(<FavoritePokemons />);
  const noFavoritesMsg = getByText(/No favorite pokemon found/i);
  expect(noFavoritesMsg).toBeInTheDocument();
});

test('Se é exibido todos os cards de pokémons favoritados.', () => {
  const { getByText } = renderWithRouter(<App />);
  const pokeDetails = getByText('More details');
  userEvent.click(pokeDetails);
  const markAsFavorite = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
  userEvent.click(markAsFavorite);
  const favoriteCounter = screen.getAllByText(/Average weight/i);
  expect(favoriteCounter.length).toBe(1);
});
