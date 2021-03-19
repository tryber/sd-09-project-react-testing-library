import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';
import pokemons from '../data';

describe('Teste o componente "FavoritePokemons"', () => {
  it('Teste se tem a mensagem No favorite pokemon found, se não tem favoritos.', () => {
    const favoritePokemons = [];
    const { getByText } = renderWithRouter(<FavoritePokemons
      pokemons={ favoritePokemons }
    />);
    const noFavorites = getByText('No favorite pokemon found');
    expect(noFavorites).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const favoritePokemons = [];
    const { getByText } = renderWithRouter(<FavoritePokemons
      pokemons={ favoritePokemons }
    />);
    favoritePokemons.forEach((pokemon) => {
      const name = getByText(pokemon.name);
      expect(name).toBeInTheDocument();
    });
  });

  it('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado.', () => {
    const favoritePokemons = [];
    const { queryByText } = renderWithRouter(<FavoritePokemons
      pokemons={ favoritePokemons }
    />);
    pokemons.forEach((pokemon) => {
      const namePokemon = favoritePokemons.find((value) => pokemon.name === value.name);
      if (!namePokemon) {
        const name = queryByText(pokemon.name);
        expect(name).toBeNull();
      }
    });
  });
});
