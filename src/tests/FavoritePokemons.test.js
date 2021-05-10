import React from 'react';
import { render } from '@testing-library/react';
import renderRouter from './renderRouter';
import FavoritePokemons from '../components/FavoritePokemons';

const mockArrayTrue = [
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Alola Route 3',
        map: 'https://cdn.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 3',
        map:
          'https://cdn.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 4',
        map:
          'https://cdn.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
      },
      {
        location: 'Kanto Rock Tunnel',
        map:
          'https://cdn.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
      },
    ],
    summary:
       `The flame on its tail shows the strength of its life force. If it is 
       weak, the flame also burns weakly.`,
  },
];

const mockArrayFalse = [];
// Testar componete pokemon favorito
describe('Testing component favorite pokemon', () => {
  // Verificar mensagem No favorite pokemon found
  it('Check message "No favorite pokemon found".', () => {
    const { getByText } = render(<FavoritePokemons />);
    const checkMessage = getByText(/no favorite pokemon found/i);
    expect(checkMessage).toBeInTheDocument();
  });
  // Verificar se é exibito todos os pokemons favoritos
  it('Check if all your favorite pokemons are displayed ', () => {
    const { getByText } = renderRouter(
      // Enviando minha api generica como props
      <FavoritePokemons pokemons={ mockArrayTrue } />,
    );
    const arrayPokemon = getByText('Charmander');
    expect(arrayPokemon).toBeInTheDocument();
  });
  // Verifica se nenhum pokemon é encontrado quando não favoritado
  it('Checks if no pokemon is found when not favored', () => {
    const { container } = renderRouter(
      // Enviando minha api generica vazia como props
      <FavoritePokemons pokemons={ mockArrayFalse } />,
    );
    const pokemonArray = container.getElementsByClassName('favorite-pokemons');

    expect(pokemonArray).not.toBe();
  });
});
