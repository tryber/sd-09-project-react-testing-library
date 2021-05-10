import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
// import renderWithRouter from './renderWithRouter';
// import { Pokedex } from '../components';
import pokemons from '../data';

describe('Test Pokedex component', () => {
  it('verifies the heading page', () => {
    // renderWithRouter(<App />);
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    expect(screen.queryByText(/encountered pokémons/i)).toBeInTheDocument();
  });

  it('tests if the next pokémon is showned when the next button is clicked', () => {
    // renderWithRouter(<App />);
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const allPokemons = pokemons.map(({ name }) => name);
    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    allPokemons.forEach((pokemonName) => {
      const currentPokemonName = pokemonName;
      expect(screen.queryByText(currentPokemonName)).toBeInTheDocument();
      userEvent.click(nextButton);
    });
    expect(screen.queryByText(/pikachu/i)).toBeInTheDocument();
  });

  it('verifies all filter buttons', () => {
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const history = createMemoryHistory();
    const allPokemonTypes = [...new Set(pokemons
      .reduce((types, { type }) => [...types, type], []))];
    allPokemonTypes.forEach((type, index) => {
      const allPokemonsButton = screen.getAllByTestId('pokemon-type-button');
      expect(allPokemonsButton[index].innerHTML).toContain(type);
      expect(allPokemonsButton[index]).toBeInTheDocument();
    });
    const buttonAll = screen.getByText('All');
    userEvent.click(buttonAll);
    expect(history.location.pathname).toBe('/');
    expect(buttonAll.disabled).toBe(false);
  });

  it('disables the next pokemon button when there\'s only one pokemon of its type',
    () => {
      render(
        <MemoryRouter initialEntries={ ['/'] }>
          <App />
        </MemoryRouter>,
      );
      const dragonTypeButton = screen.getByRole('button', { name: 'Dragon' });
      expect(screen.getByText('Próximo pokémon').disabled).toBe(false);
      userEvent.click(dragonTypeButton);
      expect(screen.getByText('Próximo pokémon').disabled).toBe(true);
    });
});
