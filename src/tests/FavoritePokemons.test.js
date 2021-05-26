import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('FavoritePokemins.js', () => {
  test('Verify message o favorite pokemon found', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const favoriteLink = getByText(/Favorite Pokémons/i);
    expect(favoriteLink).toBeInTheDocument();

    userEvent.click(favoriteLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    const favoriteText = getByText(/No favorite pokemon found/i);
    expect(favoriteText).toBeInTheDocument();
  });

  test('Verify pokemons favorites', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const moreDetailsOne = getByText(/More details/i);
    expect(moreDetailsOne).toBeInTheDocument();

    userEvent.click(moreDetailsOne);
    const favoritedOne = screen.getByRole('checkbox');
    expect(favoritedOne).toBeInTheDocument();

    userEvent.click(favoritedOne);
    expect(favoritedOne.checked).toBe(true);

    history.push('/');

    const textBug = getByText(/Bug/i);
    expect(textBug).toBeInTheDocument();
    userEvent.click(textBug);

    const moreDetailsTwo = getByText(/More details/i);
    expect(moreDetailsTwo).toBeInTheDocument();

    userEvent.click(moreDetailsTwo);
    const favoritedTwo = screen.getByRole('checkbox');
    expect(favoritedTwo).toBeInTheDocument();

    userEvent.click(favoritedTwo);
    expect(favoritedTwo.checked).toBe(true);

    history.push('/favorites');

    const arrayPokemons = screen.getAllByTestId('pokemon-name');
    expect(arrayPokemons.length).toBe(2);
  });
});
