import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import Pokedex from '../components/Pokedex';
import { pokemonMock, isFavoritePokemonMock } from './__mocks__/pokemonMock';

function renderPokedexSetup(props) {
  const NUMBER_OF_TYPE_BUTTONS = 8;
  const ALL = 'All';

  const utils = renderWithRouter(
    <Pokedex
      pokemons={ pokemonMock }
      isPokemonFavoriteById={ isFavoritePokemonMock }
      { ...props }
    />,
  );
  const nextPokemonButton = screen.getByRole('button', {
    name: /Próximo pokémon/i,
  });
  const pokemonTypesButtons = screen.queryAllByTestId('pokemon-type-button');
  const buttonAll = screen.queryByRole('button', { name: ALL });
  pokemonTypesButtons.push(buttonAll);
  expect(nextPokemonButton).toBeInTheDocument();
  expect(pokemonTypesButtons).toHaveLength(NUMBER_OF_TYPE_BUTTONS);

  return {
    ...utils,
    nextPokemonButton,
    pokemonTypesButtons,
    buttonAll,
    dbPokemonFetch: (data) => pokemonMock.map((pokemon) => pokemon[data]),
    dbPokemonFetchByType: (type) => pokemonMock.filter((pokemon) => {
      if (type === ALL) return true;
      return pokemon.type === type;
    }),
  };
}

function renderPokedexSetupWithChecks(props = {}) {
  const ALL = 'All';
  const utils = renderPokedexSetup(props);
  const {
    dbPokemonFetch,
    dbPokemonFetchByType,
    nextPokemonButton,
    pokemonTypesButtons,
  } = utils;
  const pokemonName = screen.queryByTestId('pokemon-name');

  const checkEachPokemonByNames = (pokemonNames = dbPokemonFetch('name')) => {
    const { disabled: noTestAnotherPokemon } = nextPokemonButton;
    pokemonNames.forEach((name) => {
      expect(pokemonName).toHaveTextContent(name);
      if (!noTestAnotherPokemon) {
        userEvent.click(nextPokemonButton);
      }
    });
    expect(pokemonName).toHaveTextContent(pokemonNames[0]);
  };

  const clickFilterAndVerifyChange = (type = ALL) => {
    const filteredTestPokemons = dbPokemonFetchByType(type);
    const filteredPokemonNames = filteredTestPokemons.map(
      (pokemon) => pokemon.name,
    );
    const TEST_BUTTON = pokemonTypesButtons.find(
      (typeButton) => typeButton.textContent === type,
    );
    userEvent.click(TEST_BUTTON);
    checkEachPokemonByNames(filteredPokemonNames);
  };

  return {
    ...utils,
    checkEachPokemonByNames,
    clickFilterAndVerifyChange,
  };
}

test('there are h2 heading text: Encountered pokémons', () => {
  renderPokedexSetup();

  const heading = screen.queryByRole('heading', {
    name: 'Encountered pokémons',
    level: 2,
  });

  expect(heading.textContent).toBe('Encountered pokémons');
});

test('next pokémon appears when next button was pressed and loop over pokemons', () => {
  const { checkEachPokemonByNames } = renderPokedexSetupWithChecks();
  checkEachPokemonByNames();
});

test('view only one pokemonCard when pokemonTypes/nextPokemon button is clicked', () => {
  const {
    pokemonTypesButtons,
    clickFilterAndVerifyChange,
  } = renderPokedexSetupWithChecks();

  pokemonTypesButtons.forEach((typeButton) => {
    clickFilterAndVerifyChange(typeButton.textContent);
    expect(screen.queryAllByTestId('pokemon-name')).toHaveLength(1);
  });
});

test('there are a filter fire button that only display filtered psychic pokemons', () => {
  const { clickFilterAndVerifyChange } = renderPokedexSetupWithChecks();
  clickFilterAndVerifyChange('Psychic');
});

test('start with and there are All button to override any filtered view', () => {
  const {
    checkEachPokemonByNames,
    clickFilterAndVerifyChange,
    buttonAll,
  } = renderPokedexSetupWithChecks();

  checkEachPokemonByNames();
  clickFilterAndVerifyChange();

  userEvent.click(buttonAll);

  checkEachPokemonByNames();
});

test('dynamic buttons were created sucessfull for each pokemon type', () => {
  const { pokemonTypesButtons, dbPokemonFetch, buttonAll } = renderPokedexSetup();

  const typesNameButtonsWithOutAll = pokemonTypesButtons
    .map((pokemonTypeButton) => pokemonTypeButton.textContent)
    .filter((pokemonTypeButtonName) => pokemonTypeButtonName !== 'All');

  const pokemonsByTypes = [...new Set(dbPokemonFetch('type'))];

  pokemonsByTypes.forEach((type) => {
    expect(typesNameButtonsWithOutAll).toContain(type);
    expect(buttonAll).toBeInTheDocument();
  });
});

test('button next pokemon disabled when there is one pokemon at filtered list', () => {
  const TEST_CASE = 'Electric';
  const {
    dbPokemonFetchByType,
    nextPokemonButton,
  } = renderPokedexSetup();
  const testCasePokemons = dbPokemonFetchByType(TEST_CASE);
  expect(testCasePokemons).toHaveLength(1);
  userEvent.click(screen.getByRole('button', { name: TEST_CASE }));
  expect(nextPokemonButton).toBeDisabled();
});
