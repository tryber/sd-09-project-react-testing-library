import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';

function getAllPokemonTypes() {
  const pokemonTypes = [];
  pokemons.forEach((pokemon) => {
    const pokemonTypeFound = pokemonTypes.find(
      (pokemonType) => pokemon.type === pokemonType,
    );

    if (!pokemonTypeFound) { pokemonTypes.push(pokemon.type); }
  });
  return pokemonTypes;
}

const pokemonNameTestId = 'pokemon-name';
const pokemonTypeButton = 'pokemon-type-button';

describe('Test the Pokedex component', () => {
  test('Test heading test', () => {
    const { getByRole } = renderWithRouter(<App />);
    const title = getByRole('heading', { level: 2, name: 'Encountered pokémons' });
    expect(title).toBeInTheDocument();
  });

  test('Test if is shown the next pokemon when clicked to show the next one', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const nextPokemonButton = getByTestId('next-pokemon');
    expect(nextPokemonButton.innerHTML).toBe('Próximo pokémon');

    const firstPokemon = getByTestId(pokemonNameTestId).innerHTML;
    fireEvent.click(nextPokemonButton);
    const secondPokemon = getByTestId(pokemonNameTestId).innerHTML;
    expect(firstPokemon).not.toEqual(secondPokemon);
  });

  test('Test if shows only one pokemon at a time', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(<App />);
    const nextPokemonButton = getByTestId('next-pokemon');
    fireEvent.click(nextPokemonButton);
    fireEvent.click(nextPokemonButton);
    const numberOfPokemonsOnTheScreen = getAllByTestId(pokemonNameTestId).length;
    expect(numberOfPokemonsOnTheScreen).toBe(1);
  });

  test('Test if pokedex have filter button', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(<App />);
    const typeOfPokemonButtons = getAllByTestId(pokemonTypeButton);
    typeOfPokemonButtons.forEach((button, index) => {
      const pokemonBeforeClick = getByTestId(pokemonNameTestId).innerHTML;
      fireEvent.click(button);
      const pokemonAfterClick = getByTestId(pokemonNameTestId).innerHTML;

      if (index !== 0) {
        expect(pokemonBeforeClick).not.toEqual(pokemonAfterClick);
      }
    });
  });

  test('Test if there is a reset filter button', () => {
    const { getByRole, getAllByTestId, getByTestId } = renderWithRouter(<App />);
    const resetFilterBtn = getByRole('button', { name: 'All' });
    expect(resetFilterBtn).toBeInTheDocument();

    const typeOfPokemonButtons = getAllByTestId(pokemonTypeButton);
    fireEvent.click(typeOfPokemonButtons[3]);
    const pokemonBeforeClick = getByTestId(pokemonNameTestId).innerHTML;
    fireEvent.click(resetFilterBtn);
    const pokemonAfterClick = getByTestId(pokemonNameTestId).innerHTML;
    expect(pokemonBeforeClick).not.toEqual(pokemonAfterClick);
  });

  test('Test if filters buttons are created dynamically', () => {
    const { getByRole, getAllByTestId } = renderWithRouter(<App />);
    const typesOfPokemons = getAllPokemonTypes();
    const typeOfPokemonButtons = getAllByTestId(pokemonTypeButton);
    const resetFilterBtn = getByRole('button', { name: 'All' });
    expect(resetFilterBtn).toBeInTheDocument();
    typeOfPokemonButtons.forEach((button) => {
      const typeFound = typesOfPokemons.includes(button.innerHTML);
      expect(typeFound).toBe(true);
    });
  });
});
