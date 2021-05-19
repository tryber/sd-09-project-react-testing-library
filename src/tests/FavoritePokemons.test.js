import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste Favorite Pokemons page', () => {
  it('sem favoritos exibe - No favorite pokemon found', () => {
    // access
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const noFavorite = getByText('No favorite pokemon found');

    // test
    expect(noFavorite).toBeInTheDocument();
  });

  // it('exibe pokemons favoritos', () => {
  //   // access
  //   const { queryAllByRole } = renderWithRouter(<FavoritePokemons />);
  //   const favorites = queryAllByRole.('img',{ src: '/star-icon.svg'});

  //   // test
  //   // expect(favorites.length).not.toBe(0)
  // });
});
