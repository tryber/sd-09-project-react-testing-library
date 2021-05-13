import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './help-test/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Pokedex', () => {
  it('should have a h2 with the text "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading2 = getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(heading2).toBeInTheDocument();
  });

  it('should show the next pokemon when "Proximo pokémon" is clicked', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);

    const nextPokemonButton = getByTestId('next-pokemon');
    expect(nextPokemonButton).toBeInTheDocument();
    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(nextPokemonButton);
    });
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
  });

  it('should show only one pokemon at once', () => {
    const { getAllByTestId } = renderWithRouter(<App />);

    expect(getAllByTestId('pokemon-name').length).toBe(1);
  });

  it('should render all pokemon type buttons', () => {
    const pokemonTypesList = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    const { getAllByTestId } = renderWithRouter(<App />);
    const typeButtons = getAllByTestId('pokemon-type-button');
    expect(typeButtons.length).toBe(pokemonTypesList.length);
  });

  it('should have a reset button', () => {
    const { getByText } = renderWithRouter(<App />);
    const resetButton = getByText(/All/);

    expect(resetButton).toBeInTheDocument();

    fireEvent.click(resetButton);
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
  });

  it('should disable "Proximo Pokemon" when there is only one pokemon', () => {
    const { getByText } = renderWithRouter(<App />);

    const nextButton = getByText(/Próximo pokémon/i);
    expect(nextButton).toBeInTheDocument();
    expect(nextButton.disabled).toBeFalsy();

    const dragonTypeButton = getByText(/Dragon/i);
    expect(dragonTypeButton).toBeInTheDocument();

    fireEvent.click(dragonTypeButton);
    expect(nextButton.disabled).toBeTruthy();
  });
});
