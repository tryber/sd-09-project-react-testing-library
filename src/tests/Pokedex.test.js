import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testando Pokedex', () => {
  test('Testando h2', () => {
    const { getByRole } = renderWithRouter(<App />);
    const h2 = getByRole('heading', { level: 2, name: /Encountered pokémons/i });
    expect(h2).toBeInTheDocument();
  });
  test('Testando botão "proximo pokemon"', () => {
    const { getByRole, getByText, getAllByAltText } = renderWithRouter(<App />);
    const allButton = getByRole('button', { name: /all/i });
    const button = getByRole('button', { name: /Próximo pokémon/i });
    expect(button).toBeInTheDocument();
    userEvent.click(allButton);
    userEvent.click(button);
    const pokemons = [
      /charmander/i,
      /caterpie/i,
      /ekans/i,
      /alakazam/i,
      /mew/i,
      /rapidash/i,
      /snorlax/i,
      /dragonair/i,
      /pikachu/i,
    ];
    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon)).toBeInTheDocument();
      expect(getAllByAltText(/sprite/i).length).toBe(1);
      userEvent.click(button);
    });
  });
  test('Testando botão de filtro', () => {
    const { getAllByTestId, getByRole } = renderWithRouter(<App />);
    const filters = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    const buttons = getAllByTestId('pokemon-type-button');
    const buttonProx = getByRole('button', { name: /Próximo pokémon/i });

    buttons.forEach((button, index) => {
      expect(button.textContent).toBe(filters[index]);
      if (index === 0) {
        userEvent.click(button);
        expect(buttonProx).toBeDisabled();
      }
    });
  });
  test('testa se o botão all é renderizado', () => {
    const { getByRole } = renderWithRouter(<App />);
    const btnAll = getByRole('button', { name: /all/i });
    expect(btnAll).toBeInTheDocument();
  });
});
