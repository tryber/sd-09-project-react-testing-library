import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Testa o componente <FavoritePokemons />', () => {
  test(' Verifica se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });
  test('Verifica se é exibido todos os cards de pokémons favoritados', () => {
    const { getAllByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={ pokemons } />,
    );
    expect(getAllByTestId('pokemon-name').length).toBe(pokemons.length);
  });

  test('Se não houver pokémons favoritados, nenhum card é exibido', () => {
    const { queryAllByTestId } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    expect(queryAllByTestId('pokemon-name').length).toBe(0);
  });
});
