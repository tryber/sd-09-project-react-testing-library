import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Requirement 5', () => {
  const POKEMON_NAME = 'pokemon-name';

  test('if the page contains an h2 with the text "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(<App />);

    const pokedexH2 = getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });

    expect(pokedexH2).toBeInTheDocument();
  });

  test('if the next Pokémon is displayed when the "Next Pokémon" is clicked', () => {
    const { getByRole, queryByTestId, queryByText } = renderWithRouter(<App />);

    // console.log(queryByTestId(POKEMON_NAME));
    // console.log(queryByTestId(POKEMON_NAME)[Object.keys(queryByTestId(POKEMON_NAME))[1]].children);

    const initialPokemonObject = queryByTestId(POKEMON_NAME);
    const initialPokemonName = initialPokemonObject[
      Object.keys(initialPokemonObject)[1]].children;

    expect(queryByText(initialPokemonName)).toBeInTheDocument();

    const nextPokemonButton = getByRole('button', { name: /Próximo pokémon/i });
    expect(nextPokemonButton).toBeInTheDocument();

    userEvent.click(nextPokemonButton);

    const nextPokemonObject = queryByTestId(POKEMON_NAME);
    const nextPokemonName = nextPokemonObject[
      Object.keys(nextPokemonObject)[1]].children;

    // expect(initialPokemonName).not.toBeInTheDocument(); -> THAT WAY GENERATES ERROR
    // expect(nextPokemonObject).toBeInTheDocument(); -> THAT WAY GENERATES ERROR

    expect(queryByText(initialPokemonName)).not.toBeInTheDocument();
    expect(queryByText(nextPokemonName)).toBeInTheDocument();

    // Why use queryByText instead of queryByText?
    // source: https://stackoverflow.com/questions/52783144/how-do-you-test-for-the-non-existence-of-an-element-using-jest-and-react-testing
  });

  test('if only one Pokémon is shown at a time', () => {
    const { getByRole, queryAllByTestId } = renderWithRouter(<App />);

    const nextPokemonButton = getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(nextPokemonButton);
    userEvent.click(nextPokemonButton);

    const pokemon = queryAllByTestId(POKEMON_NAME);
    expect(pokemon.length).toBe(1);
  });

  test('if Pokédex has the filter buttons', () => {
    const { queryAllByTestId } = renderWithRouter(<App />);

    const pokemonTypeList = [...new Set(pokemons.map(({ type }) => type))];

    // console.log(pokemons.map((pokemon) => pokemon.type));
    // console.log(pokemonTypeList);

    // https://dev.to/clairecodes/how-to-create-an-array-of-unique-values-in-javascript-using-sets-5dg6

    const filterByTypeButtons = queryAllByTestId('pokemon-type-button');

    // console.log(filterByTypeButtons.map((button) => button.innerHTML));

    expect(filterByTypeButtons.length).toBe(pokemonTypeList.length);

    filterByTypeButtons
      .map((button) => button.innerHTML)
      .forEach((type) => expect(pokemonTypeList.includes(type)).toBe(true));
  });

  test('if Pokédex contains a button to reset the filter (has the filter "All")', () => {
    const { getByRole } = renderWithRouter(<App />);

    const resetFilterButton = getByRole('button', { name: /All/i });

    expect(resetFilterButton).toBeInTheDocument();

    userEvent.click(resetFilterButton);
  });

  test('if a filter button is created dynamically for each type of Pokémon', () => {
    const { queryAllByTestId } = renderWithRouter(<App />);

    const pokemonTypeList = [...new Set(pokemons.map(({ type }) => type))];
    const filterByTypeButtons = queryAllByTestId('pokemon-type-button');

    pokemonTypeList.forEach((type, index) => {
      expect(filterByTypeButtons[index]).toHaveTextContent(type);
    });
  });

  test('if disables "Next Pokémon" when there is only one Pokémon in the filter', () => {
    const { getByRole } = renderWithRouter(<App />);

    const electricFilterButton = getByRole('button', { name: /Electric/i });
    const nextPokemonButton = getByRole('button', { name: /Próximo pokémon/i });

    userEvent.click(electricFilterButton);

    expect(nextPokemonButton.disabled).toBeTruthy();
  });
});
