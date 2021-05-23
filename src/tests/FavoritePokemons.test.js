import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './History';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

it('show message `no favorite pokemon found` if there isnt', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);

  expect(getByText('No favorite pokemon found')).toBeInTheDocument();
});

it('', () => {
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

it('No cards if has no favorite pokémons', () => {
  const { queryByTestId } = renderWithRouter(<FavoritePokemons />);

  expect(queryByTestId('pokemon-name')).toBeNull();
});
