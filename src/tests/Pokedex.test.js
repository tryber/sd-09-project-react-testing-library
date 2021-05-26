import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testing <Pokedex /> functionality', () => {
  it('should contain a heading h2 with the text "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', { name: /Encountered pokémons/ });
    expect(heading).toBeInTheDocument();
  });

  it('should render the next pokemon when "Próximo pokémon" is clicked', () => {
    const { getByText, getAllByTestId, getByTestId } = renderWithRouter(<App />);
    const buttonNext = getByTestId('next-pokemon');
    expect(buttonNext).toBeInTheDocument();
    const pokemonName = getAllByTestId('pokemon-name');
    pokemons.forEach(() => {
      fireEvent.click(buttonNext);
      expect(pokemonName).toHaveLength(1);
    });
    expect(getByText(/pikachu/i)).toBeInTheDocument();
  });

  it('shouldn`t render "Próximo pokémon" button when theres only one pokemon', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const buttonNext = getByTestId('next-pokemon');
    const poisonButton = getByText(/Poison/i);
    expect(poisonButton).toBeInTheDocument();
    fireEvent.click(poisonButton);
    expect(buttonNext.disabled).toBeTruthy();
  });

  it('should render all filter buttons', () => {
    const pokemonTypes = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    const { getAllByTestId } = renderWithRouter(<App />);
    const pokemonTypeButtons = getAllByTestId('pokemon-type-button');
    const pokemonTypeButtonsLength = 7;
    expect(pokemonTypeButtons).toHaveLength(pokemonTypeButtonsLength);
    pokemonTypes.forEach((type, index) => {
      expect(pokemonTypeButtons[index]).toHaveTextContent(type);
    });
  });

  it('should render a reset button', () => {
    const { getByText } = renderWithRouter(<App />);
    const resetButton = getByText('All');
    expect(resetButton).toBeInTheDocument();
    fireEvent.click(resetButton);
    fireEvent.click(getByText(/próximo pokémon/i));
    expect(getByText(/charmander/i)).toBeInTheDocument();
  });
});
