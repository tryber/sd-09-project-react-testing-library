import React from 'react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Test the <Pokedex.js /> component', () => {
  test('Test if a page contains an h2 heading', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(heading).toBeInTheDocument();
  });

  test('Testing the Next Pokémon button is clicked.', () => {
    const { getByText } = renderWithRouter(<App />);
    const btn = getByText(/Próximo pokémon/i);
    expect(btn).toBeInTheDocument();
  });

  test('Testing next pokémons on list', () => {
    const { getByText } = renderWithRouter(<App />);
    const btn = getByText('Próximo pokémon');
    pokemons.forEach((param) => {
      expect(getByText(param.name)).toBeInTheDocument();
      userEvent.click(btn);
    });
  });

  test('Test if the Pokédex has the filter buttons', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
    const filter = getAllByTestId('pokemon-type-button');
    filter.forEach((param) => {
      const type = param.textContent;
      const btnNext = getByTestId('next-pokemon');
      userEvent.click(param);
      expect(getByTestId('pokemonType').textContent).toBe(type);
      userEvent.click(btnNext);
    });
  });

  test('Test if only one Pokémon is shown at a time.', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    expect(getAllByTestId('pokemon-name').length).toBe(1);
  });

  test('The button must contain the text "All"', () => {
    const { getByText } = renderWithRouter(<App />);
    const btnAllPokemons = getByText('All');
    expect(btnAllPokemons).toBeInTheDocument();
  });

  test('Pokedéx should show Pokémon normally without filters', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const btnAll = getByText('All');
    userEvent.click(btnAll);
    expect(getByTestId('pokemon-name').textContent).toBe(pokemons[0].name);
  });
});
