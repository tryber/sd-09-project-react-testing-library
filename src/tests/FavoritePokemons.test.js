import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Test the Favorite Pokemons component', () => {
  test('Test if show a message if the user has no favorite pokemon"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/favorites');
    const paragraphNoPokemonFound = getByText(/No favorite pokemon found/);
    expect(paragraphNoPokemonFound).toBeInTheDocument();
  });

  test('Test if all pokemons favorite cards are shown"', () => {
    const { getByText } = renderWithRouter(<App />);
    const moreDetailsLink = getByText(/More details/);
    fireEvent.click(moreDetailsLink);
    const addFavoriteCheckbox = getByText(/Pokémon favoritado/);
    const favoritePageLink = getByText(/Favorite Pokémons/);
    fireEvent.click(addFavoriteCheckbox);
    fireEvent.click(favoritePageLink);
    const PikachuName = getByText(/Pikachu/);
    expect(PikachuName).toBeInTheDocument();
  });
});
