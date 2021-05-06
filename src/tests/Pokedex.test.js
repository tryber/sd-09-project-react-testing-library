import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import pokemons from '../data';

test('has a heading with text `Encountered pokémons`', () => {
  const { getByRole } = renderWithRouter(<App />);
  const heading = getByRole('heading', { level: 2 });
  expect(heading.textContent).toBe('Encountered pokémons');
});

test('shows next Pokémon when `Próximo pokémon` is clicked', () => {
  const { getByRole, getByTestId } = renderWithRouter(<App />);
  const pokemon = getByTestId('pokemon-name');
  const nextButton = getByRole('button', { name: 'Próximo pokémon' });
  fireEvent.click(nextButton);
  expect(pokemon.textContent).toBe('Charmander');
  fireEvent.click(nextButton);
  expect(pokemon.textContent).toBe('Caterpie');
});

test('shows one Pokémon at a time', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  expect(getAllByTestId('pokemon-name').length).toBe(1);
});

test('has filter buttons', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const filterButtons = getAllByTestId('pokemon-type-button');
  const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
  filterButtons.forEach((el, index) => expect(el.textContent).toBe(types[index]));
});

test('has filter buttom with text `All`', () => {
  const { getByRole } = renderWithRouter(<App />);
  const allButtom = getByRole('button', { name: 'All' });
  expect(allButtom).toBeInTheDocument();
});

test('has buttons for each Pokémon type', () => {
  const { getByRole } = renderWithRouter(<App />);
  pokemons.forEach(({ type }) => {
    expect(getByRole('button', { name: type })).toBeInTheDocument();
  });
});

test('has `Próximo pokémon` disabled when filtered list has only one Pokémon', () => {
  const { getByRole } = renderWithRouter(<App />);
  const nextButton = getByRole('button', { name: 'Próximo pokémon' });
  fireEvent.click(getByRole('button', { name: 'All' }));
  expect(nextButton).not.toBeDisabled();
  fireEvent.click(getByRole('button', { name: 'Normal' }));
  expect(nextButton).toBeDisabled();
});
