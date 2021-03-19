import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Tests regarding Pokedex functionality', () => {
  it('Tests regarding Pokedex functionality', () => {
    const { getByRole } = renderWithRouter(<App />);
    const encounteredPkmnsText = getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(encounteredPkmnsText).toBeInTheDocument();
  });
  it('Tests displayed pokemon after clicking \'Próximo pokémon\' button', () => {
    const { getByRole } = renderWithRouter(<App />);
    const nextPkmnButton = getByRole('button', { name: 'Próximo pokémon' });
    expect(nextPkmnButton).toBeInTheDocument();
    const numberOfPokemon = 8;
    for (let index = 0; index < numberOfPokemon; index += 1) {
      fireEvent.click(nextPkmnButton);
    }
    const lastPokemon = getByRole('img', { name: /Dragonair/ });
    expect(lastPokemon).toBeInTheDocument();
    fireEvent.click(nextPkmnButton);
    const firstPokemon = getByRole('img', { name: /Pikachu/ });
    expect(firstPokemon).toBeInTheDocument();
  });
  it('Tests if only one pokemon is displayed', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const onePokemonImage = getAllByRole('img', { name: /sprite/ });
    expect(onePokemonImage).toHaveLength(1);
  });
  it('tests if filter buttons work', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    // checks if psychic filter button is working
    const dragonFilterButton = getByRole('button', { name: 'Dragon' });
    expect(dragonFilterButton).toBeInTheDocument();
    fireEvent.click(dragonFilterButton);
    let typeOfPokemonDisplayed = getByTestId('pokemonType');
    expect(typeOfPokemonDisplayed).toHaveTextContent('Dragon');
    // checks if next button is disabled if filter is on
    const nextButton = getByRole('button', { name: 'Próximo pokémon' });
    expect(nextButton).toHaveAttribute('Disabled');
    // checks if filter All button works
    const filterAllButton = getByRole('button', { name: 'All' });
    fireEvent.click(filterAllButton);
    typeOfPokemonDisplayed = getByTestId('pokemonType');
    expect(typeOfPokemonDisplayed).toHaveTextContent('Electric');
  });
  it('tests if filter buttons exist', () => {
    const { getAllByTestId, getByRole } = renderWithRouter(<App />);
    const typeFilterArray = getAllByTestId('pokemon-type-button');
    const filterButtonNumber = 7;
    expect(typeFilterArray).toHaveLength(filterButtonNumber);
    const allButton = getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();
  });
});
