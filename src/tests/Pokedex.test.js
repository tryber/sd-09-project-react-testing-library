import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokedex } from '../components';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

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
const testId = 'pokemon-name';

describe('Render <Pokedex /> component,`', () => {
  test('Renders a heading `h2` with the text `Encountered pokémons`', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('show next pokemon, when click the button with text `próximo pokémon`', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const previusName = screen.queryAllByTestId(testId);
    expect(previusName[0].innerHTML).toEqual('Pikachu');
    expect(previusName.length).toBe(1);
    const buttonToNext = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.dblClick(buttonToNext);
    const nextName = screen.queryAllByTestId(testId);
    expect(nextName[0].innerHTML).toEqual('Caterpie');
    expect(nextName.length).toBe(1);
    userEvent.dblClick(buttonToNext);
    userEvent.dblClick(buttonToNext);
    userEvent.dblClick(buttonToNext);
    const lastName = screen.queryAllByTestId(testId);
    expect(lastName[0].innerHTML).toEqual('Dragonair');
    expect(lastName.length).toBe(1);
    userEvent.click(buttonToNext);
    const firstName = screen.queryAllByTestId(testId);
    expect(firstName[0].innerHTML).toEqual('Pikachu');
    expect(firstName.length).toBe(1);
  });

  test('show pokemon with filter, when click the buttons filter', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const buttonElectric = screen.getByRole('button', { name: /electric/i });
    expect(buttonElectric).toBeInTheDocument();
    userEvent.click(buttonElectric);
    pokemons
      .filter((pokemon) => (pokemon.type === 'Electric'))
      .forEach((electricPokemon) => {
        const buttonToNext = screen.getByRole('button', { name: /próximo pokémon/i });
        const name = screen.queryAllByTestId(testId);
        expect(name[0].innerHTML).toEqual(electricPokemon.name);
        expect(name.length).toBe(1);
        userEvent.click(buttonToNext);
      });
    const buttonBug = screen.getByRole('button', { name: /bug/i });
    expect(buttonBug).toBeInTheDocument();
    userEvent.click(buttonBug);
    pokemons
      .filter((pokemon) => (pokemon.type === 'Bug'))
      .forEach((bugPokemon) => {
        const buttonToNext = screen.getByRole('button', { name: /próximo pokémon/i });
        const name = screen.queryAllByTestId(testId);
        expect(name[0].innerHTML).toEqual(bugPokemon.name);
        expect(name.length).toBe(1);
        userEvent.click(buttonToNext);
      });
    const buttonPsychic = screen.getByRole('button', { name: /psychic/i });
    expect(buttonPsychic).toBeInTheDocument();
    userEvent.click(buttonPsychic);
    pokemons
      .filter((pokemon) => (pokemon.type === 'Psychic'))
      .forEach((psychicPokemon) => {
        const buttonToNext = screen.getByRole('button', { name: /próximo pokémon/i });
        const name = screen.queryAllByTestId(testId);
        expect(name[0].innerHTML).toEqual(psychicPokemon.name);
        expect(name.length).toBe(1);
        userEvent.click(buttonToNext);
      });
    const buttonDragon = screen.getByRole('button', { name: /dragon/i });
    expect(buttonDragon).toBeInTheDocument();
    userEvent.click(buttonDragon);
    pokemons
      .filter((pokemon) => (pokemon.type === 'Dragon'))
      .forEach((dragonPokemon) => {
        const buttonToNext = screen.getByRole('button', { name: /próximo pokémon/i });
        const name = screen.queryAllByTestId(testId);
        expect(name[0].innerHTML).toEqual(dragonPokemon.name);
        expect(name.length).toBe(1);
        userEvent.click(buttonToNext);
      });
  });

  test('show all pokemon, when click the button with text `All`', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);
    pokemons.forEach((pokemon) => {
      const buttonToNext = screen.getByRole('button', { name: /próximo pokémon/i });
      const name = screen.queryAllByTestId(testId);
      expect(name[0].innerHTML).toEqual(pokemon.name);
      expect(name.length).toBe(1);
      userEvent.click(buttonToNext);
    });
  });

  test('show all pokemon, when click the button with text `All`', () => {
    const pokemonsMock = [
      {
        id: 25,
        name: 'Pikachu',
        type: 'Electric',
        averageWeight: { value: '6.0', measurementUnit: 'kg' } },
      {
        id: 4,
        name: 'Charmander',
        type: 'Fire',
        averageWeight: { value: '8.5', measurementUnit: 'kg' } },
      {
        id: 78,
        name: 'Rapidash',
        type: 'Fire',
        averageWeight: { value: '95.0', measurementUnit: 'kg' } },
    ];
    renderWithRouter(<Pokedex
      pokemons={ pokemonsMock }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const filterButton = screen.queryAllByTestId('pokemon-type-button');
    expect(filterButton[0].innerHTML).toBe('Electric');
    expect(filterButton[1].innerHTML).toBe('Fire');
    expect(filterButton[2]).toBe(undefined);
    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();
  });
});

// npx stryker run ./stryker/Pokedex.conf.json
