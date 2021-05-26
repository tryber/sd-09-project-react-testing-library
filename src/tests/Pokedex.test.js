import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';
import App from '../App';

const POKEMON_NAME = 'pokemon-name';
const NEXT_POKEMON = 'Próximo pokémon';

const checkAllButtons = (button) => {
  pokemons.forEach((pokemon) => {
    const name = screen.getByTestId(POKEMON_NAME);
    expect(name).toHaveTextContent(pokemon.name);

    userEvent.click(button);
  });
};

describe('test Pokedex component', () => {
  it('test if there is a `h2` with text `Encountered pokémons`', () => {
    renderWithRouter(<App />);
    const h2 = screen.getByRole('heading', { name: 'Encountered pokémons', level: 2 });

    expect(h2).toBeInTheDocument();
  });

  it('test if all pokemons are shown while clicking on next pokemon button', () => {
    renderWithRouter(<App />);

    const button = screen.getByText(NEXT_POKEMON);
    checkAllButtons(button);

    const name = screen.getByTestId(POKEMON_NAME);
    expect(name).toHaveTextContent(pokemons[0].name);
  });

  it('test if only one pokemon is shown', () => {
    renderWithRouter(<App />);
    const pokemonList = screen.getAllByTestId(POKEMON_NAME);

    expect(pokemonList).toHaveLength(1);
  });

  it('test the filter butotns', () => {
    renderWithRouter(<App />);
    const psychicButton = screen.getByRole('button', { name: 'Psychic' });

    userEvent.click(psychicButton);

    const type = screen.getByTestId('pokemonType');
    expect(type).toHaveTextContent('Psychic');
  });

  it('test filter reset button', () => {
    renderWithRouter(<App />);
    const allButton = screen.queryByRole('button', { name: 'All' });
    const button = screen.getByText(NEXT_POKEMON);

    expect(allButton).not.toBeNull();
    userEvent.click(allButton);

    checkAllButtons(button);
  });

  it('test if there is a button for every type of pokemon', () => {
    renderWithRouter(<App />);
    const buttonList = screen.getAllByTestId('pokemon-type-button');
    const typesList = [...new Set(pokemons.reduce(
      (types, { type }) => [...types, type], [],
    ))];
    buttonList.forEach((button, index) => {
      expect(button).toHaveTextContent(typesList[index]);
    });

    const allButton = screen.queryByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();

    const electricButton = screen.queryByRole('button', { name: 'Electric' });
    const nextButton = screen.getByRole('button', { name: NEXT_POKEMON });
    userEvent.click(electricButton);
    expect(nextButton).toBeDisabled();
  });
});
