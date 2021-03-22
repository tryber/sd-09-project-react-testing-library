import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const isPokemonFavoriteById = pokemons.reduce((acc, { id }) => (
  { ...acc, [id]: false }
), {});
const pokemonNameTestId = 'pokemon-name';
const types = Array.from(
  new Set(
    pokemons.reduce((acc, { type }) => ([...acc, type]), ['all']),
  ),
);

describe('Test <Pokedex /> display', () => {
  it('renders a heading lvl 2 with text "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const title = getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });

    expect(title).toBeInTheDocument();
  });

  it('renders one Pokemon at a time', () => {
    const { getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const pokemonNameList = getAllByTestId(pokemonNameTestId);

    expect(pokemonNameList).toHaveLength(1);
  });

  test('next pokemon is shown when clicking "Próximo pokemon" button', () => {
    const { getByRole, getByTestId, queryByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const pokemon1 = getByTestId(pokemonNameTestId);
    expect(pokemon1).toHaveTextContent(pokemons[0].name);
    const nextButton = getByRole('button', { name: /Próximo pokémon/i });
    expect(nextButton).toBeInTheDocument();

    userEvent.click(nextButton);

    const pokemon2 = getByTestId(pokemonNameTestId);
    expect(pokemon2).toHaveTextContent(pokemons[1].name);
    // Previous pokemon must not be shown
    const prevPokemon = queryByText(pokemons[0].name);
    expect(prevPokemon).not.toBeInTheDocument();
  });
});

describe('Test <Pokedex /> buttons', () => {
  it('renders buttons for all available types of pokemon', () => {
    const { getByRole, getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const allButon = getByRole('button', { name: /all/i });
    expect(allButon).toBeInTheDocument();

    getAllByTestId('pokemon-type-button').forEach((e) => {
      expect(types).toContain(e.textContent);
    });
  });

  test('"All" button shows all pokemons', () => {
    const { getByRole, getByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const allButon = getByRole('button', { name: /all/i });
    userEvent.click(allButon);

    // If no filter is selected, then filteredPokemons array
    // must have length of pokemons array
    const nextButton = getByRole('button', {
      name: /próximo pokémon/i,
    });
    pokemons.forEach(() => userEvent.click(nextButton));

    const currentPokemon = getByTestId(pokemonNameTestId);
    expect(currentPokemon).toHaveTextContent(pokemons[0].name);
  });

  test('"All" button is selected by default', () => {
    const { getByRole, getByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    // If no filter is selected, then filteredPokemons array
    // must have length of pokemons array
    const nextButton = getByRole('button', {
      name: /próximo pokémon/i,
    });
    pokemons.forEach(() => userEvent.click(nextButton));

    const currentPokemon = getByTestId(pokemonNameTestId);
    expect(currentPokemon).toHaveTextContent(pokemons[0].name);
  });

  test('when a filter is selected, only pokemons of that type must be shown', () => {
    const typesCopy = types.slice(1);
    const randomType = typesCopy[Math.floor(Math.random() * typesCopy.length)];
    const filteredPokemons = pokemons.filter(({ type }) => type === randomType);

    const { getByRole, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    // Selecting type
    const typeButton = getByRole('button', { name: new RegExp(randomType, 'i') });
    userEvent.click(typeButton);

    // All button must be shown
    const allButon = getByRole('button', { name: /all/i });
    expect(allButon).toBeInTheDocument();

    // Checking the types of filtered pokemons
    const nextButton = getByRole('button', {
      name: /próximo pokémon/i,
    });
    filteredPokemons.forEach(() => {
      expect(getByText(randomType, { selector: 'p' })).toBeInTheDocument();
      userEvent.click(nextButton);
    });
  });

  it('disables "Próximo pokemon" button if there is a single pokemon in the list', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    // Electric has only Pikachu
    const typeButton = getByRole('button', { name: /electric/i });
    userEvent.click(typeButton);

    const nextButton = getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(nextButton).toBeDisabled();
  });
});
