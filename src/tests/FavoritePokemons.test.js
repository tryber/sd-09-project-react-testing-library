import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';

describe('3. Teste o componente <FavoritePokemons.js />', () => {
  it('Test if the message No favorite pokemon found is displayed on the screen', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    const message = getByText(/No favorite pokemon found/i);

    expect(message).toBeInTheDocument();
  });

  it('Test whether all your favorite Pokémon cards are displayed', () => {
    const { getByLabelText, getByText } = renderWithRouter(<App />);

    const linkMoreDetails = getByText(/more details/i);
    userEvent.click(linkMoreDetails);

    const favoritePokemon = getByLabelText(/favoritado/i);
    userEvent.click(favoritePokemon);

    const linkFavoritePokemons = getByText(/Favorite Pokémons/i);
    userEvent.click(linkFavoritePokemons);

    const averageWeightText = getByText(/Average weight/i);
    expect(averageWeightText).toBeInTheDocument();
  });

  it('Test if no Pokémon card is displayed, if it is not favored', () => {
    const { getByLabelText, getByText } = renderWithRouter(<App />);

    const linkMoreDetails = getByText(/more details/i);
    userEvent.click(linkMoreDetails);

    const favoritePokemon = getByLabelText(/favoritado/i);
    userEvent.click(favoritePokemon);

    const linkFavoritePokemons = getByText(/Favorite Pokémons/i);
    userEvent.click(linkFavoritePokemons);

    const message = getByText(/No favorite pokemon found/i);
    expect(message).toBeInTheDocument();
  });
});
