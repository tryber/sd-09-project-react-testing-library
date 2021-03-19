import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

test('Should have a h2 with "Encountered pokémons"', () => {
  renderWithRouter(<App />);

  const heading = screen.getByRole('heading', { name: /encountered/i });
  expect(heading).toBeInTheDocument();
});

test('Should show the next Pokémon when button "Próximo pokémon" is clicked', () => {
  renderWithRouter(<App />);

  const pokemonName = screen.getByTestId('pokemon-name');
  expect(pokemonName).toHaveTextContent(/pikachu/i);

  const button = screen.getByRole('button', { name: /Próximo pokémon/i });
  expect(button).toBeInTheDocument();

  userEvent.click(button);
  expect(pokemonName).toHaveTextContent(/charmander/i);

  userEvent.click(button);
  expect(pokemonName).toHaveTextContent(/caterpie/i);

  userEvent.click(button);
  expect(pokemonName).toHaveTextContent(/ekans/i);

  userEvent.click(button);
  expect(pokemonName).toHaveTextContent(/alakazam/i);

  userEvent.click(button);
  expect(pokemonName).toHaveTextContent(/mew/i);

  userEvent.click(button);
  expect(pokemonName).toHaveTextContent(/rapidash/i);

  userEvent.click(button);
  expect(pokemonName).toHaveTextContent(/snorlax/i);

  userEvent.click(button);
  expect(pokemonName).toHaveTextContent(/dragonair/i);

  userEvent.click(button);
  expect(pokemonName).toHaveTextContent(/pikachu/i);
});

test('Should only show one Pokémon at a time', () => {
  renderWithRouter(<App />);

  const pokemonList = screen.getAllByTestId('pokemon-name');
  expect(pokemonList.length).toBe(1);
});

test('Should have filter buttons', () => {
  renderWithRouter(<App />);

  const filterButtons = screen.getAllByTestId('pokemon-type-button');
  expect(filterButtons).toBeDefined();
});

test('Filter button name should be the Pokémon type', () => {
  renderWithRouter(<App />);

  const psychicButton = screen.getByText(/psychic/i);
  expect(psychicButton).toBeInTheDocument();
});

test('Should have a button to reset the filter', () => {
  renderWithRouter(<App />);

  const allButton = screen.getByText(/all/i);
  expect(allButton).toBeInTheDocument();

  userEvent.click(allButton);

  const nextButton = screen.getByText(/próximo pokémon/i);
  expect(nextButton.disabled).not.toBeTruthy();
});

test('Should render the filter buttons dynamically', () => {
  const types = ['Fire', 'Psychic', 'Electric', 'Bug', 'Poison', 'Dragon', 'Normal'];
  renderWithRouter(<App />);

  types.forEach((type) => {
    const button = screen.getByRole('button', { name: type });
    expect(button).toBeInTheDocument();
  });
});

test('"Próximo" button should be disabled when the Pokémon list only contain one', () => {
  renderWithRouter(<App />);

  const electricFilter = screen.getByRole('button', { name: /electric/i });
  userEvent.click(electricFilter);

  const nextButton = screen.getByRole('button', { name: /próximo/i });
  expect(nextButton.disabled).toBeTruthy();
});
