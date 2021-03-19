import React from 'react';
import { render, screen } from '@testing-library/react';
import renderWithRouter from './helper/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

test('"No favorite pokemon found" should appear if there are no favorite pokemon', () => {
  const pokemons = [];
  render(<FavoritePokemons pokemons={ pokemons } />);

  const noFavoriteText = screen.getByText(/no favorite pokemon found/i);
  expect(noFavoriteText).toBeInTheDocument();
});

test('Should appear the Favorite Pokémons Cards', () => {
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
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
      foundAt: [
        {
          location: 'Kanto Viridian Forest',
          map: 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
        },
        {
          location: 'Kanto Power Plant',
          map: 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
        },
      ],
      summary: 'Pikachu sumamry',
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
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
      foundAt: [
        {
          location: 'Alola Route 3',
          map: 'https://cdn.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
        },
        {
          location: 'Kanto Route 3',
          map: 'https://cdn.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
        },
        {
          location: 'Kanto Route 4',
          map: 'https://cdn.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
        },
        {
          location: 'Kanto Rock Tunnel',
          map: 'https://cdn.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
        },
      ],
      summary: 'Charmander summary',
    },
  ];
  renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

  const noFavoriteText = screen.queryByText(/no favorite pokemon found/i);
  expect(noFavoriteText).not.toBeInTheDocument();

  const pikachuName = screen.getByText(/pikachu/i);
  expect(pikachuName).toBeInTheDocument();

  const charmanderName = screen.getByText(/charmander/i);
  expect(charmanderName).toBeInTheDocument();
});
