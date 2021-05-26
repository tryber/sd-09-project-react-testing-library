import React from 'react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('3-Test the component <FavoritePokemons />', () => {
  it('Should render `No favorite pokemon found`', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const notFoundFavoritePokemon = getByText('No favorite pokemon found');

    expect(notFoundFavoritePokemon).toBeInTheDocument();
  });

  it('Should render pokemon favorited.', () => {
    const { getByText } = renderWithRouter(<App />);
    const moreDetails = getByText(/More details/);

    userEvent.click(moreDetails);
    const checkBox = getByText(/favoritado/);
    userEvent.click(checkBox);
    const favoritePokemons = getByText(/Favorite/);
    userEvent.click(favoritePokemons);
    const pikachu = getByText('Pikachu');

    expect(pikachu).toBeInTheDocument();
  });
});
