import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testing <FavoritePokemons />', () => {
  it('shouldn`t render any cards if no pokemons were favorited', () => {
    const { getByText } = render(<FavoritePokemons />);
    const noPokemon = getByText('No favorite pokemon found');
    expect(noPokemon).toBeInTheDocument();
  });

  it('should render all favorited pokemon cards', () => {
    const pokemonData = {
      pokemName: 'Pikachu',
      pokemType: 'Electric',
      pokeWeight: 'Average weight: 6.0 kg',
    };

    const { getByText, getByLabelText } = renderWithRouter(<App />);
    const moreDetailsLink = getByText('More details');
    expect(moreDetailsLink).toBeInTheDocument();
    fireEvent.click(moreDetailsLink);
    const pokemonFav = getByLabelText('Pokémon favoritado?');
    fireEvent.click(pokemonFav);
    expect(pokemonFav).toBeChecked();
    fireEvent.click(getByText(/Favorite Pokémons/));
    expect(screen.getByTestId('pokemon-name').textContent).toBe(pokemonData.pokemName);
  });
});
