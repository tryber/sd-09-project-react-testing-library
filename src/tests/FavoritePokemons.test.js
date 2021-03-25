import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Test of the favorite pokemon page', () => {
  test('the favorite pokemon page should renderize properly without favorites', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    userEvent.click(getByText('Favorite Pokémons'));
    const favoriteHeading = getByRole('heading', { level: 2 });
    expect(favoriteHeading).toBeInTheDocument();
    expect(favoriteHeading).toHaveTextContent('Favorite pokémons');
    const noFavorite = getByText(/No favorite pokemon found/i);
    expect(noFavorite).toBeInTheDocument();
  });
  test('the favorite page renderizes favorites cards', () => {
    const {
      getByText,
      getByRole,
      getByAltText,
      getAllByTestId,
      getByTestId,
    } = renderWithRouter(<App />);
    const firstPokemon = getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
    userEvent.click(getByText('More details'));
    expect(getByText('Pikachu Details')).toBeInTheDocument();
    userEvent.click(getByRole('checkbox'));
    const pikachuFavImg = getByAltText('Pikachu is marked as favorite');
    expect(pikachuFavImg).toBeInTheDocument();
    expect(pikachuFavImg).toHaveClass('favorite-icon');
    userEvent.click(getByText('Home'));
    userEvent.click(getByTestId('next-pokemon'));
    userEvent.click(getByTestId('next-pokemon'));
    const caterpie = getByText(/caterpie/i);
    expect(caterpie).toBeInTheDocument();
    userEvent.click(getByText('More details'));
    expect(getByText('Caterpie Details')).toBeInTheDocument();
    userEvent.click(getByRole('checkbox'));
    const cartepieFavImg = getByAltText('Caterpie is marked as favorite');
    expect(cartepieFavImg).toBeInTheDocument();
    expect(cartepieFavImg).toHaveClass('favorite-icon');
    userEvent.click(getByText('Favorite Pokémons'));
    const favorites = getAllByTestId('pokemon-name');
    expect(favorites.length).toEqual(2);
  });
});
