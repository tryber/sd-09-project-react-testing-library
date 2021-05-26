import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testing <Pokedex.js />', () => {
  it('Should render a h2 heading with the text `Encountered pokémons`', () => {
    const { getByRole } = renderWithRouter(<App />);
    const h2 = getByRole('heading', { name: /Encountered pokémons/i });
    expect(h2).toBeInTheDocument();
  });

  it('Should contain a button with the text `Próximo pokémon`', () => {
    const { getByText } = renderWithRouter(<App />);
    const button = getByText(/Próximo pokémon/i);
    expect(button).toBeInTheDocument();
  });

  it('Should render only one Pokémon at a time and return to the first', () => {
    const { getByText, getAllByTestId, getByTestId } = renderWithRouter(<App />);
    const button = getByText(/Próximo pokémon/i);
    pokemons.forEach(() => {
      const pokemonNames = getAllByTestId('pokemon-name');
      const pokemonName = getByTestId('pokemon-name');
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(button);
      expect(pokemonNames).toHaveLength(1);
    });
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
  });

  it('Should contain a filter button', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const typeButtons = getAllByTestId('pokemon-type-button');
    types.forEach((type, index) => {
      expect(typeButtons[index]).toHaveTextContent(type);
    });
  });

  it('Should contain a reset filter button', () => {
    const { getByText } = renderWithRouter(<App />);
    const reset = getByText(/All/i);
    expect(reset).toBeInTheDocument();
    userEvent.click(reset);
    const next = getByText(/Próximo pokémon/i);
    userEvent.click(next);
    expect(getByText(/Charmander/i)).toBeInTheDocument();
  });

  it('Should not render `Próximo pokémon` button when there is only one pokémon', () => {
    const { getByText } = renderWithRouter(<App />);
    const next = getByText(/Próximo pokémon/i);
    const poison = getByText(/Poison/i);
    expect(poison).toBeInTheDocument();
    userEvent.click(poison);
    expect(next.disabled).toBeTruthy();
  });
});
