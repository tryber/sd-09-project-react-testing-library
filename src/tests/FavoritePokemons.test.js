import React from 'react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('testes tela de favorites pokemon', () => {
  it('testa se há texto quando não há pokemon favorito', () => {
    const pokemonFavorite = [];
    const { getByText } = renderWithRouter(
      <FavoritePokemons pokemons={ pokemonFavorite } />,
    );
    const heading = getByText(/no favorite pokemon found/i);
    expect(heading).toBeInTheDocument();
  });

  it('testa se a cards na tela', () => {
    const pokemonFavorite = [pokemons[0]];
    const { getByText } = renderWithRouter(
      <FavoritePokemons pokemons={ pokemonFavorite } />,
    );
    const name = getByText('Pikachu');
    expect(name).toBeInTheDocument();
    const tipo = getByText('Electric');
    expect(tipo).toBeInTheDocument();
    const weigth = getByText('Average weight: 6.0 kg');
    expect(weigth).toBeInTheDocument();
  });
});
