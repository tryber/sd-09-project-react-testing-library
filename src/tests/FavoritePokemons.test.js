import React from 'react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

test('Exibe No favorite pokemon found, se não tiver pokémons favoritos.', () => {
  const { getByText, queryByAltText } = renderWithRouter(<FavoritePokemons />);

  const favoritePokemonMarked = /is marked as favorite$/i;
  expect(queryByAltText(favoritePokemonMarked)).not.toBeInTheDocument();

  const noPokemonsMessage = /No favorite pokemon found/i;
  expect(getByText(noPokemonsMessage)).toBeDefined();
});

test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
  const { queryAllByAltText } = renderWithRouter(<FavoritePokemons />);

  const favoritePokemonMarked = /is marked as favorite$/i;
  expect(queryAllByAltText(favoritePokemonMarked)).toBeDefined();
});

test('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado.', () => {
  const { queryByAltText, queryByTestId } = renderWithRouter(<FavoritePokemons />);

  const favoritePokemonMarked = /is marked as favorite$/i;
  expect(queryByAltText(favoritePokemonMarked)).not.toBeInTheDocument();

  const pokemonNameTestID = 'pokemon-name';
  expect(queryByTestId(pokemonNameTestID)).not.toBeInTheDocument();
});
