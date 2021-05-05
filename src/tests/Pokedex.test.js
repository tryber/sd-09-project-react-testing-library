import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import RenderWithRouter from './RenderWithRouter';
import data from '../data';

describe('Component <Pokedex.js /> Test', () => {
  test('renders a heading with the text `Encountered pokémons', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText('Encountered pokémons');
    expect(heading).toBeInTheDocument();
  });

  test('shows next pokemon when next button is clicked', () => {
    const pokemons = data.map((pokemon) => pokemon.name);
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    pokemons.forEach((pokemon) => {
      const pokemonName = getByText(pokemon);
      expect(pokemonName).toBeInTheDocument();
      fireEvent.click(getByText('Próximo pokémon'));
    });
  });

  test('shows one pokemon at a time', () => {
    const { getAllByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const pokemon = getAllByText(/Average weight/i);
    expect(pokemon.length).toBe(1);
  });

  test('test pokedex filters', () => {
    const { getByRole } = RenderWithRouter(<App />);
    const filters = data.map((pokemon) => pokemon.type);
    filters.forEach((filter) => {
      const filterName = getByRole('button', { name: filter });
      expect(filterName).toBeInTheDocument();
    });
  });

  test('test filter reset button', () => {
    const { getAllByText, getByText } = RenderWithRouter(<App />);
    const filterReset = getAllByText('All');
    expect(filterReset.length).toBe(1);
    const resetBtn = getByText('All');
    fireEvent.click(resetBtn);
    const pokemon = getByText(/Average weight/i);
    expect(pokemon).toBeInTheDocument();
  });

  test('test create dinamic filter button', () => {
    const { getByRole, getAllByText } = RenderWithRouter(<App />);
    const filters = data.map((pokemon) => pokemon.type);
    filters.forEach((filter) => {
      const filterName = getByRole('button', { name: filter });
      expect(filterName).toBeInTheDocument();
      const filterReset = getAllByText('All');
      expect(filterReset.length).toBe(1);
    });
  });

  test('disable next pokemon button', () => {
    const { getByText, getAllByTestId } = RenderWithRouter(<App />);
    const filterButtons = getAllByTestId('pokemon-type-button');

    fireEvent.click(filterButtons[0]);
    const electric = getByText(/Próximo Pokémon/i);
    expect(electric).toBeDisabled();

    fireEvent.click(filterButtons[2]);
    const bug = getByText(/Próximo Pokémon/i);
    expect(bug).toBeDisabled();
  });
});
