import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import App from '../App';
import pokemons from '../data';

describe('Requirement 05', () => {
  const favoriteByID = {
    4: true,
    10: true,
    23: true,
    25: true,
    65: true,
    78: true,
    143: true,
    148: true,
    151: true,
  };

  const listOfButtons = pokemons.reduce((prev, cur) => (
    prev.includes(cur.type) ? prev : [...prev, cur.type]
  ), ['All']);

  it('should have the heading with the text Encountered pokemons', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoriteByID }
    />);
    const pageTitle = getByRole('heading', { name: /encountered pokémons/i });
    expect(pageTitle.innerHTML).toBe('Encountered pokémons');
  });

  it('should have a button called "Próximo pokémon"', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoriteByID }
    />);
    const bttn = getByRole('button', { name: /próximo pokémon/i });
    expect(bttn).toBeInTheDocument();
  });

  it('should show only one pokemon at a time', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const pokemonCard = getAllByTestId('pokemon-name');

    expect(pokemonCard.length).toBe(1);
  });

  it('should have buttons for filter each pokemon type and the filters work', () => {
    const { getAllByTestId, getByTestId, getByRole } = renderWithRouter(<App />);
    const typeButtons = getAllByTestId('pokemon-type-button');
    const buttonAll = getByRole('button', { name: 'All' });

    expect(typeButtons.length).toBe(listOfButtons.length - 1);
    expect(buttonAll).toBeInTheDocument();

    listOfButtons.forEach((buttonText) => {
      const testedButton = getByRole('button', { name: buttonText });
      expect(testedButton).toBeInTheDocument();

      userEvent.click(testedButton);
      const pokemonType = getByTestId('pokemonType');
      expect(() => (listOfButtons.includes(pokemonType.innerHTML))).toBeTruthy();
    });
  });
});
