import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../services/renderWithRouter';

describe('Requirement 3: Component FavoritePokemon tests', () => {
  it('Renders `No favorite pokemon found` message', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const message = getByText(/No favorite pokemon found/i);
    expect(message).toBeInTheDocument();
  });
  it('Renders favorite pokemon card', () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);
    userEvent.click(getByText(/More Details/i));
    userEvent.click(getByLabelText(/Pokémon favoritado/i));
    userEvent.click(getByText(/Favorite Pokémons/i));
    expect(getByText('Pikachu')).toBeInTheDocument();
  });
  it('Not renders no-favorite pokemon card', () => {
    const { queryByText } = renderWithRouter(<FavoritePokemons />);
    expect(queryByText('Pikachu')).toBe(null);
  });
});
