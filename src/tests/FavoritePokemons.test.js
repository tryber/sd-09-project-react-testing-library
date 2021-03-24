import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('testes do componente FavoritePokemons.js', () => {
  test(
    'Deve ser exibido a mensagem NoFavoritePokemonFound, se não tiver pokémons favoritos',
    () => {
      const { getByText } = renderWithRouter(<FavoritePokemons />);
      expect(getByText('No favorite pokemon found')).toBeInTheDocument();
    },
  );

  // href Daniel Fasanaro => usar data com forEach para passar por todos pokemons
  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    pokemons.forEach((pokemon) => {
      const name = screen.getByText(pokemon.name);
      expect(name).toBeInTheDocument();
    });
  });

  test('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    const { queryByTestId } = renderWithRouter(<FavoritePokemons />);
    expect(queryByTestId('pokemon-name')).toBeFalsy();
  });
});
