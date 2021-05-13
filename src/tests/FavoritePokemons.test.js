import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from './help-test/renderWithRouter';

test('should display the message not found if does not have favorite pokemon', () => {
  const { getByText } = render(<FavoritePokemons />);

  const favoriteNotFound = getByText('No favorite pokemon found');
  expect(favoriteNotFound).toBeInTheDocument();
});

test('should display all favorite Pokémon cards.', () => {
  const { getByText, getByRole, queryByText } = renderWithRouter(<App />);

  const moreDetails = getByText('More details');
  expect(moreDetails).toBeInTheDocument();
  userEvent.click(moreDetails);
  const checkbox = getByRole('checkbox');
  expect(checkbox).toBeInTheDocument();
  userEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  const favoritePokemons = getByText('Favorite Pokémons');
  userEvent.click(favoritePokemons);
  const favoriteNotFound = queryByText('No favorite pokemon found');
  expect(favoriteNotFound).toBeNull();
});
