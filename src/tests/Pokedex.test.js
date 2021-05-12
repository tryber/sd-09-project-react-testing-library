import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testing Pokedex.js', () => {
  test('tests if it contains a heading level two', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', { level: 2, name: /Encountered pokémons/ });
    expect(heading).toBeInTheDocument();
  });

  test('tests the behavior of the button', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    fireEvent.click(getByRole('button', { name: 'Próximo pokémon' }));
    const nextPokemon = getByText('Charmander');
    expect(nextPokemon).toBeInTheDocument();
  });

  test('tests whether by clicking views of the next pokémon', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const button = getByTestId(/next-pokemon/);
    expect(button).toBeInTheDocument();
    expect(getByText(/Pikachu/)).toBeInTheDocument();
    fireEvent.click(button);
    expect(getByText(/Charmander/)).toBeInTheDocument();
    fireEvent.click(button);
    expect(getByText(/Caterpie/)).toBeInTheDocument();
    fireEvent.click(button);
    expect(getByText(/Ekans/)).toBeInTheDocument();
    fireEvent.click(button);
    expect(getByText(/Alakazam/)).toBeInTheDocument();
    fireEvent.click(button);
    expect(getByText(/Mew/)).toBeInTheDocument();
    fireEvent.click(button);
    expect(getByText(/Rapidash/)).toBeInTheDocument();
    fireEvent.click(button);
    expect(getByText(/Snorlax/)).toBeInTheDocument();
    fireEvent.click(button);
    expect(getByText(/Dragonair/)).toBeInTheDocument();
    fireEvent.click(button);
    expect(getByText(/Pikachu/)).toBeInTheDocument();
  });

  test('tests if the pokédex has the filter buttons', () => {
    const { getByRole, getAllByTestId } = renderWithRouter(<App />);
    expect(getAllByTestId('pokemon-type-button')[0]).toBeInTheDocument();
    expect(getByRole('button', { name: /Electric/ })).toBeInTheDocument();
    expect(getByRole('button', { name: /Fire/ })).toBeInTheDocument();
    expect(getByRole('button', { name: /Bug/ })).toBeInTheDocument();
    expect(getByRole('button', { name: /Poison/ })).toBeInTheDocument();
    expect(getByRole('button', { name: /Psychic/ })).toBeInTheDocument();
    expect(getByRole('button', { name: /Normal/ })).toBeInTheDocument();
    expect(getByRole('button', { name: /Dragon/ })).toBeInTheDocument();
  });

  test('tests that when you click on the filter, that type pokemon appears', () => {
    const { getByTestId, getByRole } = renderWithRouter(<App />);
    fireEvent.click(getByRole('button', { name: /All/ }));
    expect(getByTestId('pokemonType')).toHaveTextContent('Electric');
    fireEvent.click(getByRole('button', { name: /Electric/ }));
    expect(getByTestId('pokemonType')).toHaveTextContent('Electric');
    fireEvent.click(getByRole('button', { name: /Fire/ }));
    expect(getByTestId('pokemonType')).toHaveTextContent('Fire');
    fireEvent.click(getByRole('button', { name: /Bug/ }));
    expect(getByTestId('pokemonType')).toHaveTextContent('Bug');
    fireEvent.click(getByRole('button', { name: /Poison/ }));
    expect(getByTestId('pokemonType')).toHaveTextContent('Poison');
    fireEvent.click(getByRole('button', { name: /Psychic/ }));
    expect(getByTestId('pokemonType')).toHaveTextContent('Psychic');
    fireEvent.click(getByRole('button', { name: /Normal/ }));
    expect(getByTestId('pokemonType')).toHaveTextContent('Normal');
    fireEvent.click(getByRole('button', { name: /Dragon/ }));
    expect(getByTestId('pokemonType')).toHaveTextContent('Dragon');
  });
});
