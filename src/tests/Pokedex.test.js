import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

test('test if h2 is in the document', () => {
  const { getByRole } = renderWithRouter(<App />);
  const h2tag = getByRole('heading', {
    name: 'Encountered pokémons',
    level: 2,
  });
  expect(h2tag).toBeInTheDocument();
});

test('test if button Proximo Pokemon is working', () => {
  const { getByText } = renderWithRouter(<App />);

  const pokemonsNames = pokemons.map((pokemon) => pokemon.name);
  const button = getByText(/Próximo Pokémon/i);
  expect(button).toBeInTheDocument();

  for (let index = 0; index < pokemonsNames.length - 1; index += 1) {
    expect(getByText(pokemonsNames[index])).toBeInTheDocument();
    userEvent.click(button);
    expect(getByText(pokemonsNames[index + 1])).toBeInTheDocument();
    if (pokemonsNames[index + 1] === 'Dragonair') {
      userEvent.click(button);
      expect(getByText(/Pikachu/i)).toBeInTheDocument();
    }
  }
});

test('test if show just 1 pokemon at time', () => {
  const { getAllByTestId } = renderWithRouter(<App />);

  const pokemonName = getAllByTestId('pokemon-name');
  expect(pokemonName).toHaveLength(1);
});

test('test if pokedex has filter button', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const pokemonsNumberOfTypes = 7;
  const buttonsType = getAllByTestId('pokemon-type-button');
  expect(buttonsType.length).toBe(pokemonsNumberOfTypes);
  expect(buttonsType[0].innerHTML).toBe('Electric');
});

test('test if the app create dynamics buttons of each type', () => {
  const { getByRole } = renderWithRouter(<App />);

  const pokemonsTypes = pokemons.map((pokemon) => pokemon.type);
  pokemonsTypes.forEach((type) => {
    const buttonType = getByRole('button', { name: type });
    expect(buttonType).toBeInTheDocument();
  });
});

test('test if button All is workinkg', () => {
  const { getByTestId, getByText } = renderWithRouter(<App />);

  const buttonAll = getByText(/All/i);
  userEvent.click(buttonAll);
  const pokemonsNames = pokemons.map((pokemon) => pokemon.name);
  pokemonsNames.forEach((name) => {
    expect(getByTestId('pokemon-name').innerHTML).toBe(name);
    userEvent.click(getByTestId('next-pokemon'));
  });
});

test('test if next button is disable', () => {
  const { getByRole } = renderWithRouter(<App />);
  const nextButton = getByRole('button', { name: 'Próximo pokémon' });
  const normalButton = getByRole('button', { name: 'Normal' });
  userEvent.click(normalButton);
  expect(nextButton).toBeDisabled();
});
