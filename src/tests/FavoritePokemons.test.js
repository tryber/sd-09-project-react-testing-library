import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

const pokemonData = {
  pokemName: 'Pikachu',
  pokemType: 'Electric',
  pokeWeight: 'Average weight: 6.0 kg',
};

describe('Test "Favorite Pokemons" functionality', () => {
  test('Render message, if there is no favorite pokemon', () => {
    renderWithRouter(<FavoritePokemons />);
    const noPokemons = screen.getByText('No favorite pokemon found');
    expect(noPokemons).toBeInTheDocument();
  });
  test('Show favorite pokemon card', () => {
    renderWithRouter(<App />);

    fireEvent.click(screen.getByText('Home'));
    fireEvent.click(screen.getByText('More details'));
    const checkFavorite = screen.getByLabelText('Pokémon favoritado?');
    fireEvent.click(checkFavorite);
    fireEvent.click(screen.getByText('Favorite Pokémons'));

    expect(screen.getByTestId('pokemon-name').textContent).toBe(pokemonData.pokemName);
    expect(screen.getByTestId('pokemonType').textContent).toBe(pokemonData.pokemType);
    expect(screen.getByTestId('pokemon-weight').textContent).toBe(pokemonData.pokeWeight);
  });
});
