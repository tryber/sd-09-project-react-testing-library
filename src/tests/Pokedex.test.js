import React from 'react';
import { cleanup, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const POKEMON_NAME_ID = 'pokemon-name';
const NEXT_POKEMON_ID = 'next-pokemon';
const TYPE_BUTTON_ID = 'pokemon-type-button';

const ref = 0.5;

const isPokemonMock = pokemons.reduce((acc, pokemon) => {
  acc[pokemon.id] = Math.random() > ref;
  return acc;
}, {});

const pokemomCheksLoad = () => {
  pokemons.forEach(async ({ name }) => {
    const pokemonName = screen.getByTestId(POKEMON_NAME_ID);
    expect(pokemonName.innerHTML).toBe(name);

    userEvent.click(screen.getByTestId(NEXT_POKEMON_ID));

    await waitForElementToBeRemoved(() => pokemonName);
  });
};

afterEach(cleanup);

describe('testing component Pokedex.js part 1', () => {
  it('verifies if there are the text "Encountered pokémons"', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonMock }
      />,
    );

    const content = screen
      .getByRole('heading', { level: 2, name: 'Encountered pokémons' });

    expect(content).toBeInTheDocument();
  });

  it('verifies the next button', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonMock }
      />,
    );

    pokemons.forEach((_pokemon, index) => {
      const pokemonLast = index === pokemons.length - 1;
      let nextIndex = index + 1;

      if (pokemonLast) {
        nextIndex = 0;
      }

      userEvent.click(screen.getByTestId(NEXT_POKEMON_ID));
      const nextPokemon = screen.getByTestId(POKEMON_NAME_ID).innerHTML;

      expect(nextPokemon).toBe(pokemons[nextIndex].name);
    });
  });

  it('verifies if displays once', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonMock }
      />,
    );

    pokemons.forEach(() => {
      const pokemonsDiplayed = screen.getAllByTestId(POKEMON_NAME_ID);

      expect(pokemonsDiplayed).toHaveLength(1);

      userEvent.click(screen.getByTestId(NEXT_POKEMON_ID));
    });
  });
});

describe('testing component Pokedex.js part 2', () => {
  it('verifies the filter pokemons', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonMock }
      />,
    );

    const buttonsType = screen.getAllByTestId(TYPE_BUTTON_ID);

    buttonsType.forEach((button) => {
      userEvent.click(button);

      const selectedType = button.innerHTML;
      const pokemonsOfThisType = pokemons.filter(({ type }) => type === selectedType);

      pokemonsOfThisType.forEach(({ name, type }) => {
        const pokemonName = screen.getByTestId(POKEMON_NAME_ID).innerHTML;

        expect(selectedType).toBe(type);
        expect(pokemonName).toBe(name);

        userEvent.click(screen.getByTestId(NEXT_POKEMON_ID));
      });
    });
  });

  it('verifies filter reset button', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonMock }
      />,
    );

    const allButtons = screen.getByRole('button', { name: 'All' });

    expect(allButtons).toBeInTheDocument();
  });

  it('verifies all button', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonMock }
      />,
    );

    const allButton = screen.getByRole('button', { name: 'All' });
    userEvent.click(allButton);

    pokemomCheksLoad();
  });

  it('should have "All" filter enabled when page is loaded', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonMock }
      />,
    );
    pokemomCheksLoad();
  });

  it('verifies if is created a filter button', () => {
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
        isPokemonFavoriteById={ isPokemonMock }
      />,
    );

    const typeOfButtons = screen.getAllByTestId(TYPE_BUTTON_ID);
    expect(typeOfButtons).toHaveLength(dummyTypes.length);

    dummyTypes.forEach((type) => {
      const typeOfButton = screen.getAllByRole('button', { name: type });

      expect(typeOfButton).toHaveLength(1);
      expect(typeOfButton[0].innerHTML).toBe(type);
    });
  });

  it('verifies if the next button is desabled', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonMock }
      />,
    );

    const typeOfButtons = screen.getAllByTestId(TYPE_BUTTON_ID);

    typeOfButtons.forEach((button) => {
      const buttonType = button.innerHTML;
      const pokemonsType = pokemons.filter(({ type }) => type === buttonType);
      const buttonToDisabled = pokemonsType.length === 1;

      userEvent.click(button);
      const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });
      if (buttonToDisabled) expect(nextButton).toBeDisabled();
      else expect(nextButton).not.toBeDisabled();
    });
  });
});
