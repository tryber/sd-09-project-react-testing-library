import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('5. Teste o componente <Pokedex.js />', () => {
  it('Test if the page contains an h2 header with the text Pokémon found', () => {
    const { getByRole } = renderWithRouter(<App />);

    const title = getByRole('heading', {
      level: 2,
    });

    expect(title.textContent).toBe('Encountered pokémons');
  });

  it('Test if show the next Pokemon when the button is clicked', () => {
    const { getByRole } = renderWithRouter(<App />);

    const buttonNextPokemon = getByRole('button', {
      name: 'Próximo pokémon',
    });

    const imagePikachu = getByRole('img', {
      name: 'Pikachu sprite',
    });

    expect(buttonNextPokemon).toBeInTheDocument();
    expect(imagePikachu).toBeInTheDocument();
    userEvent.click(buttonNextPokemon);

    const imageCharmander = getByRole('img', {
      name: 'Charmander sprite',
    });

    expect(imageCharmander).toBeInTheDocument();
  });

  it('Test if only one Pokémon is shown at a time', () => {
    const { getAllByTestId } = renderWithRouter(<App />);

    const namePokemon = getAllByTestId('pokemon-name');
    expect(namePokemon).toHaveLength(1);
  });

  it('Test if a Pokédex has the filter buttons', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);

    const buttonPsychic = getByRole('button', {
      name: 'Psychic',
    });
    userEvent.click(buttonPsychic);

    const pokemonType = getByTestId('pokemonType');
    expect(pokemonType.textContent).toBe('Psychic');
  });

  it('Test if the Pokédex contains a button to reset the filter', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);

    const buttonBug = getByRole('button', {
      name: 'Bug',
    });
    userEvent.click(buttonBug);

    const pokemonBug = getByTestId('pokemonType');
    expect(pokemonBug.textContent).toBe('Bug');

    const buttonAll = getByRole('button', {
      name: 'All',
    });
    userEvent.click(buttonAll);

    const pokemonElectric = getByTestId('pokemonType');
    expect(pokemonElectric.textContent).toBe('Electric');
  });

  it('Test whether a filter button is created for each type of Pokémon', () => {
    const { getByRole, getAllByTestId } = renderWithRouter(<App />);

    const typesPokemon = ['Electric',
      'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

    const buttonsTypesPokemon = getAllByTestId('pokemon-type-button');

    const buttonAll = getByRole('button', {
      name: 'All',
    });

    buttonsTypesPokemon.forEach((buttonType, index) => {
      expect(buttonType.textContent).toBe(typesPokemon[index]);
    });
    expect(buttonAll).toBeDefined();
  });

  it('Tests if when you have only one pokemon, button must be disabled', () => {
    const { getByRole } = renderWithRouter(<App />);

    const buttonNormal = getByRole('button', {
      name: 'Normal',
    });
    userEvent.click(buttonNormal);

    const buttonNextPokemon = getByRole('button', {
      name: 'Próximo pokémon',
    });

    expect(buttonNextPokemon).toBeDisabled();
  });
});
