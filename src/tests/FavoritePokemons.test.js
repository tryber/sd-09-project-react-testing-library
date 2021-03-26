import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Test FavoritePokemons component', () => {
  test('Renders `No favorite pokemon found` if the favorite list is empty', () => {
    renderWithRouter(<FavoritePokemons />);

    const notFoundMessage = screen.getByText('No favorite pokemon found');

    expect(notFoundMessage).toBeInTheDocument();
  });

  test('All favorited pokemons cards are rendered', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByText(/More details/i);

    userEvent.click(moreDetailsLink);

    const favoritePokemonCheckbox = screen.getByLabelText(/Pokémon favoritado/i);

    userEvent.click(favoritePokemonCheckbox);

    const favoritePokemonLink = screen.getByText(/Favorite Pokémons/i);

    userEvent.click(favoritePokemonLink);

    const favoritedPokemon = screen.getByText(/pikachu/i);

    expect(favoritedPokemon).toBeInTheDocument();
  });

  test('Dont render a pokemon card if it is not favorited', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByText(/More details/i);

    userEvent.click(moreDetailsLink);

    const favoritePokemonCheckbox = screen.getByLabelText(/Pokémon favoritado/i);

    userEvent.click(favoritePokemonCheckbox);

    const favoritePokemonLink = screen.getByText(/Favorite Pokémons/i);

    userEvent.click(favoritePokemonLink);

    const favoritedPokemon = screen.queryByText(/pikachu/i);

    expect(favoritedPokemon).not.toBeInTheDocument();
  });
});
