import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Test the `<FavoritePokemons />` component', () => {
  it('if don\'t have a favorite pokemon, inform that\'s not found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  it('all favorite pokémon cards are displayed', async () => {
    const { getByText, history } = renderWithRouter(<App />);
    expect(getByText(/More details/i)).toBeInTheDocument();
    userEvent.click(getByText('More details'));
    const { pathname: pokemonDetails } = history.location;
    expect(pokemonDetails).toBe('/pokemons/25');
    userEvent.click(screen.getByRole('checkbox'));
    history.push('/');
    userEvent.click(getByText('Favorite Pokémons'));
    const { pathname: favoritesPage } = history.location;
    expect(favoritesPage).toBe('/favorites');
    expect(screen.queryByText('No favorite pokemon found')).toBeNull();
    expect(getByText('More details')).toBeInTheDocument();
  });
});
