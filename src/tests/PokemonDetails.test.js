import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

describe('Testa o comportamento do componente PokemonDetails', () => {
  const pokeInfo = pokemons[0];
  const match = { params: { id: '25' } };
  const isPokemonFavoriteById = { 25: false };
  test('Se as informações detalhadas do Pokemon aparecem na tela', () => {
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ isPokemonFavoriteById }
      match={ match }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ () => null }
    />);
    const pokeName = screen.getByText(`${pokeInfo.name} Details`);
    const pokeSumary = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    const pokeDescripition = screen.getByText(`${pokeInfo.summary}`);

    expect(pokeName).toBeInTheDocument();
    expect(pokeSumary).toBeInTheDocument();
    expect(pokeDescripition).toBeInTheDocument();
    expect(pokeDescripition.textContent)
      .toBe('This intelligent Pokémon roasts hard berries'
      + ' with electricity to make them tender enough to eat.');
  });

  test('Se as informações da localização do Pokemon aparecem na tela', () => {
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ isPokemonFavoriteById }
      match={ match }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ () => null }
    />);

    const pokeLocation = screen.getByRole('heading', {
      name: 'Game Locations of Pikachu',
    });
    const imagesLocation = screen.getAllByAltText(`${pokeInfo.name} location`);

    expect(pokeLocation).toBeInTheDocument();
    expect(imagesLocation[0].src)
      .toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imagesLocation[1].src)
      .toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

    expect(screen.getByText('Kanto Viridian Forest')).toBeInTheDocument();
    expect(screen.getByText('Kanto Power Plant')).toBeInTheDocument();
  });

  test('Se contem um checkbox para favoritar o pokemon apresentado', () => {
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ isPokemonFavoriteById }
      match={ match }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ () => null }
    />);

    const favCheckBox = screen.getByRole('checkbox');
    const labelCheckBox = screen.getByText('Pokémon favoritado?');

    expect(favCheckBox).toBeInTheDocument();
    expect(labelCheckBox).toBeInTheDocument();

    userEvent.click(favCheckBox);

    expect(favCheckBox.value).toBe('on');
  });
});
