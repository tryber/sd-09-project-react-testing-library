import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../RenderWithRouter';

describe('testing FavoritePokemons.js', () => {
  it('testing the message "No favorite pokemon found"', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    const notFoundTxt = getByText('No favorite pokemon found');
    expect(notFoundTxt).toBeInTheDocument();
  });

  it('testing whether to show your favorite pokemon cards', () => {
    const { queryByText } = renderWithRouter(<App />);

    fireEvent.click(queryByText('More details'));
    fireEvent.click(queryByText('Pokémon favoritado?'));
    fireEvent.click(queryByText('Favorite Pokémons'));

    const cardFavoritePage = queryByText(/Average weight/i);
    expect(cardFavoritePage).toBeInTheDocument();
  });
});
