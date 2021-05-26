import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requirement 5 - Testing component <Pokedex />', () => {
  test('there is an h2 with correct text', () => {
    const { getByRole } = renderWithRouter(<App />);
    const headingText = getByRole('heading', { level: 2 });
    expect(headingText.textContent).toBe('Encountered pokémons');
    expect(headingText).toBeInTheDocument();
  });

  test('test the next pokemon button', () => {
    const { getByText } = renderWithRouter(<App />);
    const button = getByText('Próximo pokémon');
    expect(button).toBeInTheDocument();
    expect(getByText('Pikachu')).toBeInTheDocument();
    userEvent.click(button);
    expect(getByText('Charmander')).toBeInTheDocument();
  });

  test('if one pokemon is shown at a time', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    expect(getAllByTestId('pokemon-name').length).toBe(1);
  });

  test('if there is a "filter by type" button', () => {
    const numberOfTypes = 7;
    const { getAllByTestId } = renderWithRouter(<App />);
    const buttons = getAllByTestId('pokemon-type-button');
    expect(buttons.length).toBe(numberOfTypes);
    expect(buttons[0].textContent).toBe('Electric');
    // console.log(buttons.length);
  });

  test('if there is a reset button for types', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const allButton = getByRole('button', { name: 'All' });
    const poisonTypeButton = getByRole('button', { name: 'Poison' });
    const actualPoke = getByTestId('pokemon-name');
    expect(allButton).toBeInTheDocument();
    expect(allButton.textContent).toBe('All');
    expect(actualPoke.textContent).toBe('Pikachu');
    userEvent.click(poisonTypeButton);
    expect(actualPoke.textContent).toBe('Ekans');
    userEvent.click(allButton);
    expect(actualPoke.textContent).toBe('Pikachu');
  });

  test('if there are dynamic buttons for filtering by type', () => {
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const { getByRole } = renderWithRouter(<App />);
    types.forEach((type) => {
      expect(getByRole('button', { name: type })).toBeInTheDocument();
    });
  });

  test('if "next" is disabled with single filtered pokemon', () => {
    const { getByRole } = renderWithRouter(<App />);
    const nextButton = getByRole('button', { name: 'Próximo pokémon' });
    const electricTypeButton = getByRole('button', { name: 'Electric' });
    userEvent.click(electricTypeButton);
    expect(nextButton).toBeDisabled();
  });
});
