import React from 'react';
import { cleanup, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const POKEMON_NAME_ID = 'pokemon-name';
const NEXT_POKEMON_ID = 'next-pokemon';
const TYPE_BUTTON_ID = 'pokemon-type-button';

const trueRef = 0.5;

const isPokemonFavoriteMock = pokemons.reduce((acc, pokemon) => {
  acc[pokemon.id] = Math.random() > trueRef;
  return acc;
}, {});

const checkIfEveryPokemonIsLoaded = () => {
  pokemons.forEach(async ({ name }) => {
    const pokemonName = screen.getByTestId(POKEMON_NAME_ID);
    expect(pokemonName.innerHTML).toBe(name);
    userEvent.click(screen.getByTestId(NEXT_POKEMON_ID));
    await waitForElementToBeRemoved(() => pokemonName);
  });
};

afterEach(cleanup);

describe('Pokedex.js tests', () => {
  it('should contain an h2 with the text "Encountered pokémons"', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteMock }
      />,
    );
    const heading = screen
      .getByRole('heading', { level: 2, name: 'Encountered pokémons' });
    expect(heading).toBeInTheDocument();
  });
  it('should display next pokémon when next button is clicked', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteMock }
      />,
    );
    pokemons.forEach((_pokemon, index) => {
      const isLastPokemon = index === pokemons.length - 1;
      let nextIndex = index + 1;
      if (isLastPokemon) nextIndex = 0;
      userEvent.click(screen.getByTestId(NEXT_POKEMON_ID));
      const nextPokemonName = screen.getByTestId(POKEMON_NAME_ID).innerHTML;
      expect(nextPokemonName).toBe(pokemons[nextIndex].name);
    });
  });
  it('should display only one pokémon at a time', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteMock }
      />,
    );
    pokemons.forEach(() => {
      const namesDiplayed = screen.getAllByTestId(POKEMON_NAME_ID);
      expect(namesDiplayed).toHaveLength(1);
      userEvent.click(screen.getByTestId(NEXT_POKEMON_ID));
    });
  });
  it('should display only pokémons of the type of the clicked button', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteMock }
      />,
    );
    const typeButtons = screen.getAllByTestId(TYPE_BUTTON_ID);
    typeButtons.forEach((button) => {
      userEvent.click(button);
      const selectedType = button.innerHTML;
      const pokemonsOfThisType = pokemons.filter(({ type }) => type === selectedType);
      pokemonsOfThisType.forEach(({ name, type }) => {
        const displayedName = screen.getByTestId(POKEMON_NAME_ID).innerHTML;
        expect(selectedType).toBe(type);
        expect(displayedName).toBe(name);
        userEvent.click(screen.getByTestId(NEXT_POKEMON_ID));
      });
    });
  });
  it('should have a filter reset button', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteMock }
      />,
    );
    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();
  });
  it('should display all pokémons when "All" button is clicked', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteMock }
      />,
    );
    const allButton = screen.getByRole('button', { name: 'All' });
    userEvent.click(allButton);
    checkIfEveryPokemonIsLoaded();
  });
  it('should have "All" filter enabled when page is loaded', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteMock }
      />,
    );
    checkIfEveryPokemonIsLoaded();
  });
  it('should create type buttons dynamically', () => {
    const dummyTypes = ['DummyType1', 'DummyType2', 'DummyType3'];
    let currentTypeIndex = 0;
    const mockedPokemons = pokemons.map((pokemon) => {
      currentTypeIndex = currentTypeIndex === 2 ? 0 : currentTypeIndex + 1;
      pokemon.type = dummyTypes[currentTypeIndex];
      return pokemon;
    });
    renderWithRouter(
      <Pokedex
        pokemons={ mockedPokemons }
        isPokemonFavoriteById={ isPokemonFavoriteMock }
      />,
    );
    const typeButtons = screen.getAllByTestId(TYPE_BUTTON_ID);
    expect(typeButtons).toHaveLength(dummyTypes.length);
    dummyTypes.forEach((type) => {
      const typeButton = screen.getAllByRole('button', { name: type });
      expect(typeButton).toHaveLength(1);
      expect(typeButton[0].innerHTML).toBe(type);
    });
  });
  it('should disable Next Pokémon button when there is only one pokémon of a type',
    () => {
      renderWithRouter(
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ isPokemonFavoriteMock }
        />,
      );
      const typeButtons = screen.getAllByTestId(TYPE_BUTTON_ID);
      typeButtons.forEach((button) => {
        const buttonType = button.innerHTML;
        const pokemonsOfThisType = pokemons.filter(({ type }) => type === buttonType);
        const buttonShouldBeDisabled = pokemonsOfThisType.length === 1;
        userEvent.click(button);
        const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });
        if (buttonShouldBeDisabled) expect(nextButton).toBeDisabled();
        else expect(nextButton).not.toBeDisabled();
      });
    });
});
