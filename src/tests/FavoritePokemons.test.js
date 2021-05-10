import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Test component FavoritePokémons', () => {
  it('Mensagem de "No favorite pokemon found" se não tiver favoritos', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);

    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  it('Página tem aparecer todos pokémons favoritados', () => {
    const objTest = [
      {
        id: 1,
        name: 'pokebosta',
        type: 'coco',
        averageWeight: {
          value: '5.0',
          measurementUnit: 'kg',
        },
        image: 'nada',
      },
    ];

    const { getByTestId } = renderWithRouter(<FavoritePokemons pokemons={ objTest } />);

    const testId = getByTestId('pokemon-name');

    expect(testId).toBeInTheDocument();
    expect(testId.textContent).toBe('pokebosta');
  });

  it('Nenhum card pode aparecer se não tiver em favoritos', () => {
    const { queryAllByTestId } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);

    expect(queryAllByTestId('pokemon-name').length).toBe(0);
  });
});
