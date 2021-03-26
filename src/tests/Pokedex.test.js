import React from 'react';
import { fireEvent } from '@testing-library/react';

import renderWithRouter from './helpers';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const mockPokemons = [pokemons[0], pokemons[1]];
const mockFavoritePokemons = { [pokemons[0].id]: true, [pokemons[1].id]: false };

const NEXT_BUTTON = 'next-pokemon';
const POKEMON_TYPE_BUTTON = 'pokemon-type-button';

test('should have a heading with `Encountered pokémons`', () => {
  const { getByRole } = renderWithRouter(
    <Pokedex
      pokemons={ mockPokemons }
      isPokemonFavoriteById={ mockFavoritePokemons }
    />,
  );

  const heading = getByRole('heading', { level: 2 });
  expect(heading).toHaveTextContent('Encountered pokémons');
});

test('should render the next pokemon when the button is clicked', () => {
  const { getByTestId } = renderWithRouter(
    <Pokedex
      pokemons={ mockPokemons }
      isPokemonFavoriteById={ mockFavoritePokemons }
    />,
  );

  const nextPokemonButton = getByTestId(NEXT_BUTTON);
  expect(nextPokemonButton).toHaveTextContent('Próximo pokémon');

  fireEvent.click(nextPokemonButton);
  const pokemonName = getByTestId('pokemon-name');
  expect(pokemonName).toHaveTextContent(mockPokemons[1].name);

  fireEvent.click(nextPokemonButton);
  expect(pokemonName).toHaveTextContent(mockPokemons[0].name);
});

test('should render only one pokemon each time', () => {
  const { getAllByTestId } = renderWithRouter(
    <Pokedex
      pokemons={ mockPokemons }
      isPokemonFavoriteById={ mockFavoritePokemons }
    />,
  );
  const pokemonCards = getAllByTestId('pokemon-name');
  expect(pokemonCards).toHaveLength(1);
});

test('should have the filter buttons', () => {
  const { getAllByTestId } = renderWithRouter(
    <Pokedex
      pokemons={ mockPokemons }
      isPokemonFavoriteById={ mockFavoritePokemons }
    />,
  );
  const filterButtons = getAllByTestId(POKEMON_TYPE_BUTTON);

  const pokemonTypes = [
    'Fire', 'Psychic', 'Electric', 'Bug', 'Poison', 'Dragon', 'Normal',
  ];
  filterButtons.forEach((button) => {
    expect(button).toBeInTheDocument();
    expect(pokemonTypes).toContain(button.textContent);
  });
});

test('should have a button to reset filters', () => {
  const { getByTestId, getByText } = renderWithRouter(
    <Pokedex
      pokemons={ mockPokemons }
      isPokemonFavoriteById={ mockFavoritePokemons }
    />,
  );
  const resetFilterButton = getByText('All');
  expect(resetFilterButton).toBeInTheDocument();
  const listedPokemonTypes = [];
  const pokemonType = getByTestId('pokemonType');
  listedPokemonTypes.push(pokemonType.textContent);

  const nextPokemonButton = getByTestId(NEXT_BUTTON);
  fireEvent.click(nextPokemonButton);
  listedPokemonTypes.push(pokemonType.textContent);

  expect(listedPokemonTypes[0]).not.toBe(listedPokemonTypes[1]);
});

test('should reset the filters when click in `All` button', () => {
  const { getByTestId, getAllByTestId, getByText } = renderWithRouter(
    <Pokedex
      pokemons={ mockPokemons }
      isPokemonFavoriteById={ mockFavoritePokemons }
    />,
  );
  const resetFilterButton = getByText('All');
  const electricFilterButton = getAllByTestId(POKEMON_TYPE_BUTTON)[0];
  fireEvent.click(electricFilterButton);
  fireEvent.click(resetFilterButton);
  const listedPokemonTypes = [];
  const pokemonType = getByTestId('pokemonType');
  listedPokemonTypes.push(pokemonType.textContent);

  const nextPokemonButton = getByTestId(NEXT_BUTTON);
  fireEvent.click(nextPokemonButton);
  listedPokemonTypes.push(pokemonType.textContent);

  expect(listedPokemonTypes[0]).not.toBe(listedPokemonTypes[1]);
});

test('should filter buttons be dynamic rendering only listed pokemons types', () => {
  const { getAllByTestId } = renderWithRouter(
    <Pokedex
      pokemons={ [mockPokemons[0]] }
      isPokemonFavoriteById={ mockFavoritePokemons }
    />,
  );
  const filterButtons = getAllByTestId(POKEMON_TYPE_BUTTON);
  expect(filterButtons).toHaveLength(1);
});

test('should render filter button to all pokemons types', () => {
  const { getAllByTestId } = renderWithRouter(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ mockFavoritePokemons }
    />,
  );
  const pokemonTypes = [
    'Fire', 'Psychic', 'Electric', 'Bug', 'Poison', 'Dragon', 'Normal',
  ];
  const filterButtons = getAllByTestId(POKEMON_TYPE_BUTTON);
  filterButtons.forEach((button) => {
    expect(button).toBeInTheDocument();
    expect(pokemonTypes).toContain(button.textContent);
  });
});

test('should desable the next pokemon button when has only on pokemon', async () => {
  const { getByTestId } = renderWithRouter(
    <Pokedex
      pokemons={ [mockPokemons[0]] }
      isPokemonFavoriteById={ mockFavoritePokemons }
    />,
  );

  const nextPokemonButton = getByTestId(NEXT_BUTTON);
  expect(nextPokemonButton).toHaveAttribute('disabled');
});
