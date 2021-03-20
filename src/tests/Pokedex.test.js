import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('tests the Pokedex componenet', () => {
  test('Tests if component has a h2 with te text "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();

    const headintext = screen.getByText(/Encountered pokémons/i);
    expect(headintext).toBeInTheDocument();
  });

  test('Tests the Next pokemon button', () => {
    renderWithRouter(<App />);

    const pokemons = [
      'Pikachu',
      'Charmander',
      'Caterpie',
      'Ekans',
      'Alakazam',
      'Mew',
      'Rapidash',
      'Snorlax',
      'Dragonair',
      'Pikachu',
    ];

    const nextPokemonBtn = screen.getByText(/Próximo pokémon/i);
    expect(nextPokemonBtn).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      const pokedex = screen.getByText(pokemon);
      userEvent.click(nextPokemonBtn);
      return expect(pokedex).toBeInTheDocument;
    });
  });

  test('Tests if the component has a reset button', () => {
    renderWithRouter(<App />);
    const allBtn = screen.getByRole('button', { name: 'All' });
    expect(allBtn).toBeInTheDocument();
    userEvent.click(allBtn);
    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });

  test(`Tests if a Pokédex has buttons for each type of Pokémon and when 
  clicking on a button of a certain type it must navigate only between the types`,
  () => {
    renderWithRouter(<App />);

    const arrayBtns = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];

    const nextPokemonBtn = screen.getByText(/Próximo pokémon/i);
    expect(nextPokemonBtn).toBeInTheDocument();

    arrayBtns.forEach((button) => {
      const typeButton = screen.getByRole('button', { name: button });
      expect(typeButton).toBeInTheDocument();
      userEvent.click(typeButton);
      const allPokeType = screen.getAllByTestId('pokemon-type-button');
      expect(allPokeType.length).toBe(arrayBtns.length);

      switch (button) {
      case 'Electric':
        expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
        break;
      case 'Fire':
        expect(screen.getByText(/Charmander/i)).toBeInTheDocument();
        userEvent.click(nextPokemonBtn);
        expect(screen.getByText(/Rapidash/i)).toBeInTheDocument();
        break;
      case 'Bug':
        expect(screen.getByText(/Caterpie/i)).toBeInTheDocument();
        break;
      case 'Poison':
        expect(screen.getByText(/Ekans/i)).toBeInTheDocument();
        break;
      case 'Psychic':
        expect(screen.getByText(/Alakazam/i)).toBeInTheDocument();
        userEvent.click(nextPokemonBtn);
        expect(screen.getByText(/Mew/i)).toBeInTheDocument();
        break;
      case 'Normal':
        expect(screen.getByText(/Snorlax/i)).toBeInTheDocument();
        break;
      case 'Dragon':
        expect(screen.getByText(/Dragonair/i)).toBeInTheDocument();
        break;
      default:
        break;
      }
    });
  });

  test(`Tests if the Next pokemon button is disabled when the pokemon
  filter has only one pokemon`,
  () => {
    renderWithRouter(<App />);

    const typeButton = screen.getByRole('button', { name: 'Electric' });
    userEvent.click(typeButton);

    const nextPokemonBtn = screen.getByText(/Próximo pokémon/i);
    expect(nextPokemonBtn).toBeDisabled();
    expect(nextPokemonBtn).not.toBeEnabled();
  });
});
