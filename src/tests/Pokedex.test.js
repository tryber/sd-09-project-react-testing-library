import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test Pokedex component', () => {
  test('Renders the title `Encountered pokémons`', () => {
    renderWithRouter(<App />);

    const heading2 = screen.getByRole('heading', { level: 2 });

    expect(heading2).toBeInTheDocument();
    expect(heading2).toHaveTextContent(/Encountered pokémons/);
  });

  test('Show the next pokemon when the button `Próximo pokémon` is clicked', () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('button', { name: 'Próximo pokémon' });

    userEvent.click(button);

    const charmander = screen.getByTestId('pokemon-name');

    expect(charmander).toBeInTheDocument();
    expect(charmander).toHaveTextContent('Charmander');
  });

  test('Only one pokemon is shown', () => {
    renderWithRouter(<App />);

    const pokemon = screen.getAllByTestId('pokemon-name');

    expect(pokemon).toHaveLength(1);
  });

  test('The filter buttons are working', () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('button', { name: 'Fire' });

    userEvent.click(button);

    const pokemonType = screen.getByTestId('pokemonType');

    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Fire');
  });

  test('The reset button is working', () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('button', { name: 'All' });

    userEvent.click(button);

    const pokemonType = screen.getByTestId('pokemonType');

    expect(button).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Electric');
  });

  it('The filter buttons are dynamic created', () => {
    renderWithRouter(<App />);

    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    const resetButton = screen.getByRole('button', { name: 'All' });

    expect(resetButton).toBeInTheDocument();
    typeButtons.forEach((button, index) => {
      expect(button).toHaveTextContent(types[index]);
    });
  });

  test('The button `Proximo Pokemon` is disabled if there is only 1 pokemon', () => {
    renderWithRouter(<App />);

    const typeButton = screen.getByRole('button', { name: 'Electric' });
    const nextPokemonButton = screen.getByRole('button', { name: 'Próximo pokémon' });

    userEvent.click(typeButton);

    expect(nextPokemonButton).toBeInTheDocument();
    expect(nextPokemonButton).toBeDisabled();
  });
});
