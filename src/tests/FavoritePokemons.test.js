import React from 'react';
import renderWithRouter from '../helper/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Tests for the FavoritePokemons components', () => {
  it('should render a page with "No favorite pokemon found"', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });

  it('should show all favorited pokemons', () => {
    const favoritedPokemons = [pokemons[1], pokemons[3]];
    const { getAllByText } = renderWithRouter(<FavoritePokemons
      pokemons={ favoritedPokemons }
    />);

    expect(getAllByText(/Average weight/i).length).toBe(2);
  });

  it('should show only favorited pokemons', () => {
    const favoritedPokemons = [pokemons[0], pokemons[1]];
    const { getByText, queryByText } = renderWithRouter(<FavoritePokemons
      pokemons={ favoritedPokemons }
    />);

    // Tive que usar o queryByText porque o getByText da erro quando não acha...
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
    expect(getByText(/Charmander/i)).toBeInTheDocument();
    expect(queryByText(/Caterpie/i)).not.toBeInTheDocument();
    expect(queryByText(/Ekans/i)).not.toBeInTheDocument();
  });
});
