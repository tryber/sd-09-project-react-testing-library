import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

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

describe('Testes do componente Pokedex', () => {
  it('Teste se página contém um heading h2 com o texto "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const heading = getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista, e se mostra um card por vez', () => {
    const { getAllByRole, getByText, getAllByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const allButtons = getAllByRole('button');
    const nextPokemon = 'Próximo pokémon';
    const allButtonsLength = 9;
    expect(allButtons.length).toBe(allButtonsLength);
    expect(allButtons[8].innerHTML).toBe(nextPokemon);

    pokemons.forEach((pokemon) => {
      const pokemonName = getByText(pokemon.name);
      expect(pokemonName).toBeInTheDocument();
      const averageWeight = getAllByText(/Average weight/);
      expect(averageWeight.length).toBe(1);
      userEvent.click(allButtons[8]);
    });

    const pokemonName = getByText('Pikachu');
    expect(pokemonName).toBeInTheDocument();
    const averageWeight = getAllByText(/Average weight/);
    expect(averageWeight.length).toBe(1);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    const { getAllByRole, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const pokemonTypes = pokemons
      .reduce((types, { type }) => ((types
        .includes(type)) ? types : [...types, type]), ['All']);
    const allButtons = getAllByRole('button');
    pokemonTypes.forEach((type, index) => {
      expect(allButtons[index].innerHTML).toBe(type);
    });
    userEvent.click(allButtons[2]);
    const charmander = getByText('Charmander');
    expect(charmander).toBeInTheDocument();
    userEvent.click(allButtons[allButtons.length - 1]);
    const rapidash = getByText('Rapidash');
    expect(rapidash).toBeInTheDocument();
    userEvent.click(allButtons[allButtons.length - 1]);
    const charmanderReturn = getByText('Charmander');
    expect(charmanderReturn).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getAllByRole, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const allButtons = getAllByRole('button');
    userEvent.click(allButtons[3]);
    const caterpie = getByText('Caterpie');
    expect(caterpie).toBeInTheDocument();
    userEvent.click(allButtons[0]);
    pokemons.forEach((pokemon) => {
      const pokemonName = getByText(pokemon.name);
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(allButtons[8]);
    });
    const pokemonName = getByText('Pikachu');
    expect(pokemonName).toBeInTheDocument();
  });

  it('Teste se é criado, dinamicamente, um botão para cada tipo de Pokémon', () => {
    const { getAllByTestId, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const pokemonTypes = pokemons
      .reduce((types, { type }) => ((types
        .includes(type)) ? types : [...types, type]), ['All']);
    const typeButtons = getAllByTestId('pokemon-type-button');
    const all = getByText('All');
    const allButtons = [all, ...typeButtons];
    pokemonTypes.forEach((type, index) => {
      expect(allButtons[index].innerHTML).toBe(type);
      userEvent.click(allButtons[index]);
      expect(allButtons[0]).not.toBeDisabled();
    });
  });

  it('O botão de Próximo pokémon deve ser desabilitado quando a listapokémon.', () => {
    const { getAllByTestId, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const nextPokemon = 'Próximo pokémon';
    const typeButtons = getAllByTestId('pokemon-type-button');
    userEvent.click(typeButtons[0]);
    const electricSeleted = getByText(nextPokemon);
    expect(electricSeleted).toBeDisabled();
    userEvent.click(typeButtons[2]);
    const bugSeleted = getByText(nextPokemon);
    expect(bugSeleted).toBeDisabled();
  });
});
