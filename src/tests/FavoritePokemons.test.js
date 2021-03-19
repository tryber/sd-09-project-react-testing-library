import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa o component FavoritePokemons', () => {
  test('Testa se é exibido na tela a mensagem No favorite pokemon found', () => {
    const empty = [];
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ empty } />);
    const msg = 'No favorite pokemon found';

    const noFavorites = getByText(msg);
    expect(noFavorites).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const pokemons = [{
      id: 148,
      name: 'Dragonair',
      type: 'Dragon',
      averageWeight: {
        value: '16.5',
        measurementUnit: 'kg',
      },
      image: 'https://cdn.bulbagarden.net/upload/2/2c/Spr_5b_148.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Dragonair_(Pok%C3%A9mon)',
      foundAt: [
        {
          location: 'Johto Route 45',
          map: 'https://cdn.bulbagarden.net/upload/2/21/Johto_Route_45_Map.png',
        },
        {
          location: 'Johto Dragon\'s Den',
          map: 'https://cdn.bulbagarden.net/upload/1/1e/Johto_Dragons_Den_Map.png',
        },
      ],
      summary: `They say that if it emits an aura from its whole body, 
      the weather will begin to change instantly.`,
    }];

    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

    const name = getByText('Dragonair');
    expect(name).toBeInTheDocument();
    const type = getByText('Dragon');
    expect(type).toBeInTheDocument();
    const weight = getByText(/Average weight: 16.5 kg/);
    expect(weight).toBeInTheDocument();
  });
});
