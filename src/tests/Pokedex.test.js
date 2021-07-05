import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

const nameTestId = 'pokemon-name';
const nextPokemon = 'next-pokemon';
describe('Test \'Pokedex.js\' Component - Requirement 05', () => {
  it('has \'h2\' with \'Encountered pokémons\' text', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Encountered pokémons/i);
  });
  it('Changes pokemons after click in \'Próximo pokémon\' button', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const button = getByTestId(nextPokemon);
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Próximo pokémon');
    const firstPokemon = getByTestId(nameTestId).textContent;
    userEvent.click(button);
    const secondPokemon = getByTestId(nameTestId).textContent;
    expect(firstPokemon).not.toBe(secondPokemon);
    let pokemon;
    const maxClicks = 100;
    let loopComplete = false;
    for (let i = 0; pokemon !== firstPokemon && i < maxClicks; i += 1) {
      userEvent.click(button);
      pokemon = getByTestId(nameTestId).textContent;
      if (pokemon === firstPokemon) {
        loopComplete = true;
      }
    }
    expect(loopComplete).toBe(true);
  });
  it('Only have one pokémon at a time', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const pokémons = getAllByTestId(nameTestId);
    expect(pokémons.length).toBe(1);
  });
  it('Has filter button', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
    const filterButtons = getAllByTestId('pokemon-type-button');
    filterButtons.forEach((button) => {
      userEvent.click(button);
      const filterType = button.textContent;
      const nextButton = getByTestId(nextPokemon);
      expect(nextButton).toBeInTheDocument();
      const firstPokemon = getByTestId(nameTestId).textContent;
      let pokemonType = getByTestId('pokemon-type').textContent;
      expect(pokemonType).toBe(filterType);
      userEvent.click(nextButton);
      let pokemon;
      const maxClicks = 100;
      let loopComplete = false;
      for (let i = 0; pokemon !== firstPokemon && i < maxClicks; i += 1) {
        userEvent.click(nextButton);
        pokemon = getByTestId(nameTestId).textContent;
        pokemonType = getByTestId('pokemon-type').textContent;
        expect(pokemonType).toBe(filterType);
        if (pokemon === firstPokemon) {
          loopComplete = true;
        }
      }
      expect(loopComplete).toBe(true);
    });
  });
  it('has reset filter button', () => {
    const { getByText } = renderWithRouter(<App />);
    const resetFilter = getByText('All');
    userEvent.click(resetFilter);
    expect(resetFilter).toBeInTheDocument();
  });
  it('has one button per pokemon type', () => {
    const { getAllByTestId, queryByRole, getByTestId } = renderWithRouter(<App />);
    const filtersList = getAllByTestId('pokemon-type-button');
    const typesList = [...new Set(pokemons.reduce(
      (types, { type }) => [...types, type], [],
    ))];
    filtersList.forEach((button, index) => {
      expect(button).toHaveTextContent(typesList[index]);
    });

    const allButton = queryByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();

    const bugButton = queryByRole('button', { name: 'Bug' });
    const nextButton = getByTestId(nextPokemon);
    userEvent.click(bugButton);
    expect(nextButton).toBeDisabled();
  });
});
