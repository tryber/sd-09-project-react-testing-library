import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const POKEMON_TYPES = [
  'Fire',
  'Psychic',
  'Electric',
  'Bug',
  'Poison',
  'Dragon',
  'Normal',
];

const checkTypeButton = (type) => POKEMON_TYPES.some((pokeType) => pokeType === type);

describe('Test the Pokedex component', () => {
  test('the pokedex page have a h2 heading', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Encountered pokémons');
  });

  test('the next pokemon is showed when next-pokemon button is clicked', () => {
    const { getByText, getAllByTestId, getByTestId } = renderWithRouter(<App />);
    userEvent.click(getByText('All'));
    const firstPokemon = getAllByTestId('pokemon-name');
    const nextPokemonButton = getByTestId('next-pokemon');
    expect(nextPokemonButton).toHaveTextContent('Próximo pokémon');
    expect(firstPokemon[0]).toBeInTheDocument();
    expect(firstPokemon.length).toEqual(1);
    let currentPokemon = '';
    do {
      userEvent.click(nextPokemonButton);
      currentPokemon = getAllByTestId('pokemon-name');
      expect(currentPokemon[0]).toBeInTheDocument();
      expect(currentPokemon.length).toEqual(1);
    } while (firstPokemon[0].innerText !== currentPokemon[0].innerText);
    expect(currentPokemon).toEqual(firstPokemon);
  });
  test('the Pokedex has the filter buttons', () => {
    const { getAllByTestId, getByText, getByTestId } = renderWithRouter(<App />);
    const typeButons = getAllByTestId('pokemon-type-button');
    const nextButton = getByTestId('next-pokemon');
    const resetButton = getByText('All');
    expect(resetButton).toBeInTheDocument();
    expect(nextButton).toBeEnabled();
    expect(nextButton).toBeInTheDocument();
    const pokemonTypeInitial = getByTestId('pokemonType').textContent;
    userEvent.click(nextButton);
    expect(nextButton).toBeVisible();
    const pokemonTypeAfterClick = getByTestId('pokemonType').textContent;
    expect(pokemonTypeInitial === pokemonTypeAfterClick).toBeFalsy();
    userEvent.click(getByText('Home'));
    expect(nextButton).toBeVisible();
    for (let index = 0; index < typeButons.length; index += 1) {
      const typeValid = checkTypeButton(typeButons[index].textContent);
      expect(typeValid).toBeTruthy();
      userEvent.click(typeButons[index]);
      expect(nextButton).toBeVisible();
      let pokemonType = getByTestId('pokemonType');
      expect(typeButons[index].textContent).toEqual(pokemonType.textContent);
      if (!nextButton.disabled) {
        userEvent.click(nextButton);
        pokemonType = getByTestId('pokemonType');
        expect(typeButons[index].textContent).toEqual(pokemonType.textContent);
        expect(nextButton).toBeVisible();
      } else {
        expect(nextButton.disabled).toBeTruthy();
      }
    }
    expect(nextButton).toBeVisible();
  });
});
