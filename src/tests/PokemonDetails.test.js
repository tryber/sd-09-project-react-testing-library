import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

describe('Teste o componente "PokemonDetails"', () => {
  const match = {
    isExact: true,
    params: { id: '25' },
    path: '/pokemons/:id',
    url: '/pokemons/25',
  };
  it('Teste se as informações do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ false }
      pokemons={ pokemons }
      match={ match }
    />);
    const name = screen.getByRole('heading', {
      nivel: 2,
      name: /Pikachu Details/,
    });
    expect(name).toBeInTheDocument();

    const moreDetails = screen.queryByText(/More details/i);
    expect(moreDetails).toBeNull();

    const summaryTitle = screen.getByRole('heading', {
      level: 2,
      name: /Summary/,
    });
    expect(summaryTitle).toBeInTheDocument();

    const textPokemon = screen.getByText(
      /This intelligent Pokémon roasts hard berries with electricity/,
    );
    expect(textPokemon).toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com os mapas', () => {
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ false }
      pokemons={ pokemons }
      match={ match }
    />);

    const gameLocationText = screen.getByRole('heading', {
      level: 2,
      name: /Game Locations of Pikachu/,
    });
    expect(gameLocationText).toBeInTheDocument();

    const location = screen.getAllByAltText(/Pikachu location/i);
    expect(location.length).toBe(2);

    location.forEach((value, i) => {
      expect(value.src).toBe(pokemons[0].foundAt[i].map);
    });
  });

  it('Teste se o usuário pode favoritar um pokémon', () => {
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ false }
      pokemons={ pokemons }
      match={ match }
    />);

    const favoritecheckBox = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });
    expect(favoritecheckBox).toBeInTheDocument();
  });
});
