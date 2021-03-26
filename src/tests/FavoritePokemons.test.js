import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

test('if page contains No favorite pokemon found', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const noFavoriteParagraph = getByText('No favorite pokemon found');
  expect(noFavoriteParagraph).toBeInTheDocument();
});

test('if contains all favorite cards', () => {
  const { getByText, getByRole, getByTestId, history } = renderWithRouter(<App />);

  const moreDetailsLink = getByText('More details');
  fireEvent.click(moreDetailsLink);
  const checkbox = getByRole('checkbox');
  fireEvent.click(checkbox);
  const image = getByRole('img', { name: 'Pikachu is marked as favorite' });
  expect(image).toBeInTheDocument();
  const favoriteLink = getByText('Favorite Pokémons');
  fireEvent.click(favoriteLink);
  expect(getByTestId('pokemon-name')).toBeInTheDocument();
  expect(getByTestId('pokemonType')).toBeInTheDocument();
  expect(getByTestId('pokemon-weight')).toBeInTheDocument();
  expect(history.location.pathname).toBe('/favorites');
});
