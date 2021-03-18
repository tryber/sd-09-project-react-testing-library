import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import FavoritePokemons from '../components/FavoritePokemons';

test('Tests Favorite without pokemons', () => {
  const { getByText } = render(<FavoritePokemons pokemons={ [] } />);
  expect(getByText('No favorite pokemon found')).toBeInTheDocument();
});
test('Tests Favorite with pokemons', () => {
  const pokemons = [
    {
      id: 25,
      name: 'Pikachu',
      type: 'Electric',
      averageWeight: {
        value: '6.0',
        measurementUnit: 'kg',
      },
      image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    },
    {
      id: 4,
      name: 'Charmander',
      type: 'Fire',
      averageWeight: {
        value: '8.5',
        measurementUnit: 'kg',
      },
      image: 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    },
  ];

  const hist = createBrowserHistory();
  const { queryByText } = render(
    <Router history={ hist }>
      <FavoritePokemons pokemons={ pokemons } />
    </Router>,
  );

  expect(queryByText('Charmander')).toBeInTheDocument();
  expect(queryByText('Pikachu')).toBeInTheDocument();
  expect(queryByText('Squirtle')).not.toBeInTheDocument();
});
