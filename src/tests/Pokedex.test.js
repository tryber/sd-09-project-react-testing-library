import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import renderWithRouter from './renderWithRouter';
import data from '../data';

describe('Testa o componente Pokedex', () => {
  const isPokemonFavoriteById = {
    4: false,
    10: false,
    23: false,
    25: false,
    65: false,
    78: false,
    143: false,
    148: false,
    151: false,
  };

  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const containsH2 = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(containsH2).toBeInTheDocument();
  });

  test('Teste se é ex o próx Pokémon da lista quando o botão Próx pok é clicado', () => {
    renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const containsBtn = screen.getByTestId('next-pokemon');
    const nextPok = screen.getByText(/Próximo pokémon/i);
    fireEvent.click(containsBtn);
    expect(containsBtn.type).toBe('button');
    expect(nextPok).toBeInTheDocument();
    expect(containsBtn).toBeInTheDocument('next-pokemon');
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const renderOne = screen.queryAllByTestId('pokemon-name');
    expect(renderOne.length).toBe(1);
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const buttonType = screen.getByRole('button', {
      name: (/Electric/i),
    });
    fireEvent.click(buttonType);
    const typepok = screen.getByTestId('pokemonType');
    expect(typepok).toHaveTextContent(buttonType.innerHTML);
  });
});

describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  const isPokemonFavoriteById = {
    4: false,
    10: false,
    23: false,
    25: false,
    65: false,
    78: false,
    143: false,
    148: false,
    151: false,
  };

  test('O texto do botão deve ser All', () => {
    renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const buttonAll = screen.getByRole('button', {
      name: (/All/i),
    });
    fireEvent.click(buttonAll);
    expect(buttonAll).toBeInTheDocument();
  });
});

describe('Teste se é criado, dinam., um botão de filtro para cada tipo de Pok.', () => {
  const isPokemonFavoriteById = {
    4: false,
    10: false,
    23: false,
    25: false,
    65: false,
    78: false,
    143: false,
    148: false,
    151: false,
  };

  test('Os botões de filtragem devem ser dinâmicos;', () => {
    renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const pokTypes = screen.getAllByTestId('pokemon-type-button');
    expect(types.length).toBe(pokTypes.length);
  });

  test('O btn de Próx pok deve ser desab qdo a lis filt de Pok tiver um só pok.;', () => {
    renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const buttonDisabled = screen.getByRole('button', {
      name: (/Próximo pokémon/i),
    });
    expect(buttonDisabled).toBeInTheDocument();
    const onePok = screen.getByRole('button', {
      name: (/Electric/i),
    });
    expect(onePok).toBeInTheDocument();
    fireEvent.click(onePok);
    expect(buttonDisabled).toBeDisabled();
  });
});
