import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

const nextPokemon = 'Próximo pokémon';
const filteredPokemons = (array, next) => array.forEach((Pokemon) => {
  const element = screen.getByText(Pokemon.name);
  expect(element).toBeInTheDocument();
  userEvent.click(next);
});
const clickerButton = (next) => userEvent.click(next);

describe('tests the component Pokedex', () => {
  it('should render a h2 title with text Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const paragraph = getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });

    expect(paragraph).toBeInTheDocument();
  });

  it('should render the next pokémon by clicking Próximo pokémon button', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const next = getByRole('button', {
      name: nextPokemon,
    });

    expect(next.textContent).toBe('Próximo pokémon');

    pokemons.forEach(({ name }) => {
      expect(getByText(name)).toBeInTheDocument();
      clickerButton(next);
    });

    const TWOASSERTIONS = 2;

    expect(getByText(/Pikachu/i)).toBeInTheDocument();
    expect.assertions(pokemons.length + TWOASSERTIONS);
  });

  it('should render only one pokemon by time.', () => {
    const { getAllByRole, getByRole } = renderWithRouter(<App />);
    const next = getByRole('button', {
      name: nextPokemon,
    });

    for (let index = 0; index < pokemons.length; index += 1) {
      const pokemonCard = getAllByRole('img');
      expect(pokemonCard).toHaveLength(1);
      clickerButton(next);
    }

    expect.assertions(pokemons.length);
  });

  it('must have filter buttons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const button = getByRole('button', {
      name: 'Psychic',
    });

    userEvent.click(button);

    const filteringPokemons = pokemons
      .filter(
        ({ type }) => type === 'Psychic',
      );

    const next = getByRole('button', {
      name: nextPokemon,
    });

    filteredPokemons(filteringPokemons, next);

    const ONEASSERTION = 1;

    expect(button.textContent).toBe('Psychic');
    expect.assertions(filteredPokemons.length + ONEASSERTION);
  });

  it('should render all pokemons of same type of the clicked button', () => {
    const { getByRole } = renderWithRouter(<App />);
    const button = getByRole('button', {
      name: 'All',
    });

    userEvent.click(button);
    expect(button).toBeInTheDocument();

    const next = getByRole('button', {
      name: nextPokemon,
    });

    const TENASSERTIONS = 10;
    expect.assertions(TENASSERTIONS);

    filteredPokemons(pokemons, next);
  });

  it('must have a reset button filter', () => {
    const indexPokemons = 3;
    const mockedPokemons = pokemons.filter((_pokemon, index) => index < indexPokemons);

    const { getByRole, queryByText, queryAllByText } = renderWithRouter(<App />);
    const Allbutton = getByRole('button', { name: /All/ });
    const next = getByRole('button', { name: nextPokemon });

    expect(Allbutton.textContent).toBe('All');
    mockedPokemons
      .forEach(({ type }) => {
        expect(queryAllByText(type)).toHaveLength(2);
        if (!next.disabled) { clickerButton(next); }
      });

    userEvent.click(Allbutton);

    for (let index = 0; index < pokemons.length; index += 1) {
      expect(queryByText(pokemons[index].name)).not.toBeNull();
      userEvent.click(next);
    }
    const FOURASSERTIONS = 4;

    expect.assertions(pokemons.length + FOURASSERTIONS);
  });

  it('should render a button for each type of pokemons without repetition', () => {
    const { getAllByTestId, getByRole } = renderWithRouter(<App />);

    const pokemonTypes = pokemons.map(({ type }) => type);
    const pokemonTypesUniques = Array.from(new Set(pokemonTypes));
    const buttonPokemonTypes = getAllByTestId('pokemon-type-button');

    expect(buttonPokemonTypes).toHaveLength(pokemonTypesUniques.length);

    const poisonButton = getByRole('button', { name: /Poison/ });
    userEvent.click(poisonButton);

    const next = getByRole('button', {
      name: nextPokemon,
    });

    expect(next).toBeDisabled();
  });
});
