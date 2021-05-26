import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testing <FavoritePokemons.js />', () => {
  it('Should render a `No favorite pokemon found` text if there are no favorites', () => {
    const { getByText } = render(<FavoritePokemons />);
    const noFavorites = getByText(/No favorite pokemon found/i);
    expect(noFavorites).toBeInTheDocument();
  });

  it('Should render the cards of all favorites pokémons', () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);
    const details = getByText(/More details/i);
    userEvent.click(details);
    const favorite = getByLabelText(/Pokémon favoritado/i);
    userEvent.click(favorite);
    const favorites = getByText(/Favorite Pokémons/i);
    userEvent.click(favorites);
    const pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
