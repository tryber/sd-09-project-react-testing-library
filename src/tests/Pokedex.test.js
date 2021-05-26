import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

const testIdName = 'pokemon-name';
const testIdType = 'pokemonType';
const testIdNext = 'next-pokemon';
const testIdTypeButton = 'pokemon-type-button';

describe('Pokedex.js', () => {
  test('Verify message o Encountered pokémons', () => {
    renderWithRouter(<App />);

    const messageTitle = screen.getByRole('heading', { level: 2 });
    expect(messageTitle.innerHTML).toBe('Encountered pokémons');
  });

  test('Verify display next pokémon', () => {
    renderWithRouter(<App />);

    const button = screen.getByTestId(testIdNext);
    expect(button.innerHTML).toBe('Próximo pokémon');

    for (let index = 0; index < pokemons.length; index += 1) {
      userEvent.click(button);
    }

    const firstPokemon = screen.getByTestId(testIdName);
    expect(firstPokemon.innerHTML).toBe(pokemons[0].name);

    const clickTimes = Math.round(Math.random() * pokemons.length - 1);

    for (let index = 0; index < clickTimes; index += 1) {
      userEvent.click(button);
    }

    const lastPokemon = screen.getByTestId(testIdName);
    expect(lastPokemon.innerHTML).toBe(pokemons[clickTimes].name);
  });

  test('Verify one pokémon for time', () => {
    renderWithRouter(<App />);

    const pokemon = screen.getAllByTestId(testIdName);
    expect(pokemon.length).toBe(1);
  });

  test('Verify filter buttons', () => {
    renderWithRouter(<App />);

    const pokeType = Math.round(Math.random() * 2);
    const arrayButtons = screen.getAllByTestId(testIdTypeButton);

    if (pokeType === 0) {
      const buttonFilter = arrayButtons.find((button) => button.innerHTML === 'Fire');
      userEvent.click(buttonFilter);
      const pokemon = screen.getByTestId('pokemonType');
      expect(pokemon.innerHTML).toBe('Fire');
    } else {
      const buttonFilter = arrayButtons.find((button) => button.innerHTML === 'Psychic');
      userEvent.click(buttonFilter);
      const pokemon = screen.getByTestId('pokemonType');
      expect(pokemon.innerHTML).toBe('Psychic');
    }
  });

  test('Verify reset filter button', () => {
    renderWithRouter(<App />);

    const resetButton = screen.getByText('All');
    expect(resetButton.innerHTML).toBe('All');

    userEvent.click(resetButton);
    const firstType = screen.getByTestId(testIdType);
    expect(firstType.innerHTML).toBe('Electric');

    const nextPokemon = screen.getByTestId(testIdNext);
    userEvent.click(nextPokemon);
    const secondType = screen.getByTestId(testIdType);
    expect(secondType.innerHTML).toBe('Fire');

    userEvent.click(nextPokemon);
    const thirdType = screen.getByTestId(testIdType);
    expect(thirdType.innerHTML).toBe('Bug');
  });

  test('Verify dynamic create filter button', () => {
    renderWithRouter(<App />);

    const arrayButtons = [
      'Fire', 'Psychic', 'Electric', 'Bug', 'Poison', 'Dragon', 'Normal'];
    const filterButtons = screen.getAllByTestId(testIdTypeButton);

    let counter;
    arrayButtons.forEach((button) => {
      counter = filterButtons.filter((btn) => btn.innerHTML === button);
      expect(counter.length).toBe(1);
    });

    const buttonAll = screen.getByText('All');
    expect(buttonAll).toBeInTheDocument();
  });

  test('Verify disable next Pokemon button ', () => {
    renderWithRouter(<App />);

    const arrayButtons = ['Electric', 'Bug', 'Poison', 'Dragon', 'Normal'];
    const filterButtons = screen.getAllByTestId(testIdTypeButton);
    const nextButton = screen.getByTestId(testIdNext);
    let buttonClick;

    arrayButtons.forEach((button) => {
      buttonClick = filterButtons.find((btn) => btn.innerHTML === button);
      userEvent.click(buttonClick);
      expect(nextButton.disabled).toBe(true);
    });

    const buttonAll = screen.getByText('All');
    expect(buttonAll).toBeInTheDocument();
  });
});
