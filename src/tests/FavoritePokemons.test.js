import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Testing FavoritePokemons.js', () => {
  test('tests if there are favorite pokemons', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const notFavorite = getByText('No favorite pokemon found');
    expect(notFavorite).toBeInTheDocument();
  });

  test('test if all favorite pokemon tests are displayed', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/));
    fireEvent.click(getByText(/Pokémon favoritado?/));
    history.push('/favorites');
    const pikachu = getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });
});
