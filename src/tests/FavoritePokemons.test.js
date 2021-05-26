import React from 'react';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

test('Teste: é exib: No favorite pokemon found, se a pess. ñ tiver pok. fav.', () => {
  const { getByText } = render(<FavoritePokemons />);
  const paragraph = getByText(/No favorite pokemon found/i);
  expect(paragraph).toBeInTheDocument();
});

test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
  const pokemons = [{
    averageWeight: {
      measurementUnit: 'kg',
      value: '6.0' },
    foundAt: [
      { location: 'Kanto Viridian Forest', map: 'https://c…' },
      { location: 'Kanto Power Plant', map: 'https://cdn.b…' }],
    id: 25,
    image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    name: 'Pikachu',
    summary: `This intelligent Pokémon roasts hard berries with
        electricity to make them tender enough to eat.`,
    type: 'Electric',
  }];
  const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
  const name = getByText('Pikachu');
  expect(name).toBeInTheDocument();
  const type = getByText('Electric');
  expect(type).toBeInTheDocument();
  const averageWeight = getByText(/Average weight: 6.0 kg/i);
  expect(averageWeight).toBeInTheDocument();
});
