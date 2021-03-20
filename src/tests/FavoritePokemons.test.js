import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Tests the FavoritePokemons component', () => {
  const favorites = '/favorites';
  test(`If you dont have any favorite pokemon the message "No favorite pokemon
  found" appears`,
  () => {
    const { history } = renderWithRouter(<App />);

    const faviritePokemon = screen.getByText(/Favorite pokémon/i);
    expect(faviritePokemon).toBeInTheDocument();

    userEvent.click(faviritePokemon);
    const { location } = history;
    const { pathname: favoritePage } = location;
    expect(favoritePage).toBe(favorites);

    const noFavoritePokemons = screen.getByText('No favorite pokemon found');
    expect(noFavoritePokemons).toBeInTheDocument();
  });

  test('Tests if no pokemon appears if not favored', () => {
    const { history } = renderWithRouter(<App />);

    const faviritePokemon = screen.getByText(/Favorite pokémons/i);
    expect(faviritePokemon).toBeInTheDocument();

    userEvent.click(faviritePokemon);
    const { location } = history;
    const { pathname } = location;
    expect(pathname).toBe(favorites);

    const pokeCard = screen.queryByText(/More details/i);
    expect(pokeCard).toBeNull();
  });

  test('Tests the favorite pokemons', () => {
    const { history } = renderWithRouter(<App />);

    const moredetails = screen.getByText(/More details/);
    expect(moredetails).toBeInTheDocument();

    userEvent.click(moredetails);
    const { location } = history;
    const { pathname } = location;
    expect(pathname).toBe('/pokemons/25');

    const favorite = screen.getByText(/Pokémon favoritado?/i);
    expect(favorite).toBeInTheDocument();
    userEvent.click(favorite);

    history.push('/');
    const faviritePokemon = screen.getByText(/Favorite pokémons/i);
    expect(faviritePokemon).toBeInTheDocument();

    userEvent.click(faviritePokemon);
    const { location: local } = history;
    const { pathname: favoritePath } = local;
    expect(favoritePath).toBe(favorites);

    const noFavoritePokemons = screen.queryByText('No favorite pokemon found');
    expect(noFavoritePokemons).toBeNull();

    const pokeCard = screen.getByText(/More details/i);
    expect(pokeCard).toBeInTheDocument();
  });
});
