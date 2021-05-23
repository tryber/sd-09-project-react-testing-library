import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './History';
import App from '../App';
import pokemons from '../data';

it('Heading with text `Encountered pokémons`', () => {
  const { getByRole } = renderWithRouter(<App />);
  const heading = getByRole('heading', { level: 2 });

  expect(heading.textContent).toBe('Encountered pokémons');
});

it('Print next pokemon when clicked in button `Próximo pokémon`', () => {
  const { getByRole, getByTestId } = renderWithRouter(<App />);
  const pokemon = getByTestId('pokemon-name');
  const nextButton = getByRole('button', { name: 'Próximo pokémon' });

  fireEvent.click(nextButton);
  expect(pokemon.textContent).toBe('Charmander');

  fireEvent.click(nextButton);
  expect(pokemon.textContent).toBe('Caterpie');
});

it('Print only one pokemon ', () => {
  const { getAllByTestId } = renderWithRouter(<App />);

  expect(getAllByTestId('pokemon-name').length).toBe(1);
});

it('Filter button exist', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const filterButtons = getAllByTestId('pokemon-type-button');
  const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
  filterButtons.forEach((el, index) => expect(el.textContent).toBe(types[index]));
});

it('filter button with text `All`', () => {
  const { getByRole } = renderWithRouter(<App />);
  const buttonAll = getByRole('button', { name: 'All' });

  expect(buttonAll).toBeInTheDocument();
});

it('Button for each type', () => {
  const { getByRole } = renderWithRouter(<App />);

  pokemons.forEach(({ type }) => {
    expect(getByRole('button', { name: type })).toBeInTheDocument();
  });
});

it('Button next pokemon disabled when filtered result one pokemon', () => {
  const { getByRole } = renderWithRouter(<App />);
  const nextButton = getByRole('button', { name: 'Próximo pokémon' });

  fireEvent.click(getByRole('button', { name: 'All' }));
  expect(nextButton).not.toBeDisabled();

  fireEvent.click(getByRole('button', { name: 'Normal' }));
  expect(nextButton).toBeDisabled();
});
