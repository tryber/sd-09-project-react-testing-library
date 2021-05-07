import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Test the <Pokedex.js /> component', () => {
  test('if the page contains an h2 heading with the text Encountered Pokémon.', () => {
    renderWithRouter(<App />);
    const h2Encountered = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(h2Encountered).toBeInTheDocument();
  });
  test('If only one Pokémon is shown at a time.', () => {
    renderWithRouter(<App />);
    const imgPokemon = screen.getAllByRole('img');
    expect(imgPokemon).toHaveLength(1);
  });
});

describe('Test whether the next Pokémon is displayed when the button is clicked.',
  () => {
    test('If the button should contain the text Next pokémon', () => {
      renderWithRouter(<App />);
      const buttonNext = screen.getByRole('button', {
        name: /próximo pokémon/i,
      });
      expect(buttonNext).toBeInTheDocument();
    });
    test('If the next Pokémon are shown, by clicking on the button', () => {
      renderWithRouter(<App />);
      const buttonNext = screen.getByRole('button', {
        name: /próximo pokémon/i,
      });
      const pikachu = screen.getByText(/pikachu/i);
      expect(pikachu).toBeInTheDocument();
      userEvent.click(buttonNext);
      const charmander = screen.getByText(/charmander/i);
      expect(charmander).toBeInTheDocument();
      userEvent.click(buttonNext);
      const caterpie = screen.getByText(/caterpie/i);
      expect(caterpie).toBeInTheDocument();
      userEvent.click(buttonNext);
      const ekans = screen.getByText(/ekans/i);
      expect(ekans).toBeInTheDocument();
      userEvent.click(buttonNext);
      const alakazam = screen.getByText(/alakazam/i);
      expect(alakazam).toBeInTheDocument();
      userEvent.click(buttonNext);
      const mew = screen.getByText(/mew/i);
      expect(mew).toBeInTheDocument();
      userEvent.click(buttonNext);
      const rapidash = screen.getByText(/rapidash/i);
      expect(rapidash).toBeInTheDocument();
      userEvent.click(buttonNext);
      const snorlax = screen.getByText(/snorlax/i);
      expect(snorlax).toBeInTheDocument();
      userEvent.click(buttonNext);
      const dragonair = screen.getByText(/dragonair/i);
      expect(dragonair).toBeInTheDocument();
      userEvent.click(buttonNext);
      expect(pikachu).toBeInTheDocument();
    });
  });

describe('Test if the Pokédex contains a button to reset the filter', () => {
  test('If the button text must be All', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);
  });
});

describe('Test if the Pokédex has the filter buttons.', () => {
  test('If when selecting a type, the Pokédex has only Pokémon of that type.', () => {
    renderWithRouter(<App />);
    const buttonEletric = screen.getByRole('button', {
      name: /electric/i,
    });
    userEvent.click(buttonEletric);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
    const buttonNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(buttonNext);
    expect(pikachu).toBeInTheDocument();
  });
});

describe('Test whether a filter button is created dynamically for each type of Pokémon.',
  () => {
    test('The filter buttons must be dynamic', () => {
      renderWithRouter(<App />);
      const buttonNext = screen.getByRole('button', {
        name: /próximo pokémon/i,
      });
      expect(buttonNext).not.toBeDisabled();
      const buttonEletric = screen.getByRole('button', {
        name: /electric/i,
      });
      userEvent.click(buttonEletric);
      expect(buttonNext).toBeDisabled();
    });

    test('If there is a filter button for each type of Pokémon', () => {
      renderWithRouter(<App />);
      const buttonTypePokemon = screen.getAllByTestId('pokemon-type-button');
      const seven = 7;
      expect(buttonTypePokemon).toHaveLength(seven);
    });
  });
