import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testando o componente FavoritePokémons.js', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found.', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('Favorite Pokémons'));
    const text = getByText('No favorite pokemon found');
    expect(text).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const pokemons = [
      {
        id: 25,
        name: 'Pikachu',
        type: 'Electric',
        averageWeight: {
          value: '6.0',
          measurementUnit: 'kg',
        },
        image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png' },
    ];
    const { getAllByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={ pokemons } />,
    );
    const cards = getAllByTestId('pokemon-name');
    expect(cards.length).toBe(pokemons.length);
  });

  test('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    const { queryAllByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={ [] } />,
    );
    const cards = queryAllByTestId('pokemon-name');
    expect(cards.length).toBe(0);
  });
});
