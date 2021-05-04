import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const favoritePokemonIds = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};
const proxPoke = 'Próximo pokémon';
const types = ['Fire', 'Psychic', 'Electric', 'Bug', 'Poison', 'Dragon', 'Normal'];

test('h2 as heading', () => {
  const { getByRole } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ favoritePokemonIds }
  />);
  const header = getByRole('heading', { ariaLevel: 2 });
  expect(header).toBeInTheDocument();
  expect(header).toHaveTextContent('Encountered pokémons');
});

test('next pokemon button', () => {
  const { getByText, queryByText } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ favoritePokemonIds }
  />);
  const nextBtn = getByText(proxPoke);
  const pikachu = queryByText(/pikachu/i);
  expect(nextBtn).toBeInTheDocument();
  expect(pikachu).toBeInTheDocument();
  fireEvent.click(nextBtn);
  const pikachu2 = queryByText(/pikachu/i);
  expect(pikachu2).toBe(null);
  for (let i = 1; i < Object.keys(favoritePokemonIds).length; i += 1) {
    fireEvent.click(nextBtn);
  }
  const pikachu3 = queryByText(/pikachu/i);
  expect(pikachu3).toBeInTheDocument();
});

test('only one pokemon on screen', () => {
  const { getAllByTestId } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ favoritePokemonIds }
  />);
  const pokemonsOnScreen = getAllByTestId('pokemon-name');
  expect(pokemonsOnScreen).toHaveLength(1);
});

test('type filter button', () => {
  const { getByText } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ favoritePokemonIds }
  />);
  const fireBtn = getByText('Fire');
  fireEvent.click(fireBtn);
  const charmander = getByText(/charmander/i);
  expect(charmander).toBeInTheDocument();
  const nextBtn = getByText(proxPoke);
  fireEvent.click(nextBtn);
  const rapidash = getByText(/rapidash/i);
  expect(rapidash).toBeInTheDocument();
  fireEvent.click(nextBtn);
  const charmander2 = getByText(/charmander/i);
  expect(charmander2).toBeInTheDocument();
});

test('all types button', () => {
  const { getByText, queryByText } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ favoritePokemonIds }
  />);
  const allBtn = getByText('All');
  expect(allBtn).toBeInTheDocument();
  const pikachu = queryByText(/pikachu/i);
  expect(pikachu).toBeInTheDocument();
  const fireBtn = getByText('Fire');
  fireEvent.click(fireBtn);
  const pikachu2 = queryByText(/pikachu/i);
  expect(pikachu2).toBe(null);
  fireEvent.click(allBtn);
  const pikachu3 = queryByText(/pikachu/i);
  expect(pikachu3).toBeInTheDocument();
});

test('a filter button for each type', () => {
  const { getByText, getByRole, getAllByTestId } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ favoritePokemonIds }
  />);
  const allBtn = getByText('All');
  expect(allBtn).toBeInTheDocument();
  types.forEach((type) => {
    const button = getByRole('button', { name: type });
    expect(button).toBeInTheDocument();
  });
  const allBtns = getAllByTestId('pokemon-type-button');
  expect(allBtns).toHaveLength(types.length);
});

test('disable next button with only one pokemon', () => {
  const { getByText, getByRole } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ favoritePokemonIds }
  />);
  const bugBtn = getByRole('button', { name: 'Bug' });
  fireEvent.click(bugBtn);
  const nextBtn = getByText(proxPoke);
  expect(nextBtn).toBeDisabled();
});
