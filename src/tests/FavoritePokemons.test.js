import React from 'react';
import { FavoritePokemons } from '../components';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

describe('Testa componente FavoritePokemons.js', () => {
  it('Testa que mensagem No favorite pokemon found', () => {
    const favoritePokemons = [];
    const { getByText } = renderWithRouter(
      <FavoritePokemons pokemons={ favoritePokemons } />,
    );
    const notFoundText = getByText('No favorite pokemon found');
    expect(notFoundText).toBeInTheDocument();
  });

  it('Testa se são exibidos os cards de pokemons favoritados', () => {
    const favoritePokemons = [pokemons[0]];
    const { getByText } = renderWithRouter(
      <FavoritePokemons pokemons={ favoritePokemons } />,
    );
    const name = getByText('Pikachu');
    expect(name).toBeInTheDocument();
    const type = getByText('Electric');
    expect(type).toBeInTheDocument();
    const averageWeight = getByText('Average weight: 6.0 kg');
    expect(averageWeight).toBeInTheDocument();
  });
});
