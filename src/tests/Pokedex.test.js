import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../helper/renderWithRouter';
import { Pokedex } from '../components';
import pokemons from '../data';

describe('Fourth requirement, testing the Pokedex.js component', () => {
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
  const pokemonTypes = [
    'Fire', 'Psychic', 'Electric', 'Bug', 'Poison', 'Dragon', 'Normal',
  ];
  // ** Source https://github.com/tryber/sd-09-project-react-testing-library/pull/40/files */
  it('has a heading with text `Encountered pokémons`', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const pokedexHeading = getByRole(
      'heading',
      { level: 2, name: 'Encountered pokémons' },
    );
    expect(pokedexHeading).toBeInTheDocument();
  });
  it('has a button `Próximo pokémon`', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const nextButton = getByRole('button', { name: 'Próximo pokémon' });
    expect(nextButton).toBeInTheDocument();
  });
  it('shows the next pokémon when the button `Próximo Pokémon` is clicked', () => {
    const { getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const nextButton = getByTestId('next-pokemon');
    const pokemonName = 'pokemon-name';
    const pokemonWeight = 'pokemon-weight';
    const firstPokemonOnScreen = {
      name: getByTestId(pokemonName).textContent,
      type: getByTestId('pokemonType').textContent,
      weight: getByTestId(pokemonWeight).textContent,
    };
    expect(firstPokemonOnScreen).toStrictEqual({
      name: 'Pikachu',
      type: 'Electric',
      weight: 'Average weight: 6.0 kg',
    });
    fireEvent.click(nextButton);
    const secondPokemonOnScreen = {
      name: getByTestId(pokemonName).textContent,
      type: getByTestId('pokemonType').textContent,
      weight: getByTestId(pokemonWeight).textContent,
    };
    expect(secondPokemonOnScreen).toStrictEqual({
      name: 'Charmander',
      type: 'Fire',
      weight: 'Average weight: 8.5 kg',
    });
  });
  it('shows one pokémon at a time', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    expect(getAllByTestId('pokemon-name').length).toBe(1);
    expect(getAllByTestId('pokemonType').length).toBe(1);
    expect(getAllByTestId('pokemon-weight').length).toBe(1);
  });
  it('has a button to reset the filter', () => {
    const { getAllByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const listOfButtons = getAllByRole('button');
    const buttonAll = listOfButtons.some((button) => button.textContent === 'All');
    expect(buttonAll).toBeTruthy();
  });
  it('has one button for each type of pokemon', () => {
    const { getAllByRole, getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const listOfButtonsByRole = getAllByRole('button');
    const listOfButtonsByTestId = getAllByTestId('pokemon-type-button');
    pokemonTypes.forEach((type) => {
      expect(listOfButtonsByRole
        .some((button) => button.textContent === type)).toBeTruthy();
    });
    pokemonTypes.forEach((type) => {
      expect(listOfButtonsByTestId
        .some((button) => button.textContent === type)).toBeTruthy();
    });
  });
  it('has always the all button', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const allButton = getByRole('button', {
      name: 'All',
    });
    const filterPokemons = jest.fn();
    fireEvent.click(allButton);
    filterPokemons();
    expect(filterPokemons).toHaveBeenCalled();
  });
});
