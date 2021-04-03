import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Tests Pokedex', () => {
  beforeEach(() => {
    render(<MemoryRouter><App /></MemoryRouter>);
  });

  test('Tests encountered Pokémons', () => {
    const headings = screen.getByRole('heading', { level: 2 });
    expect(headings).toHaveTextContent('Encountered pokémons');
  });

  test('Tests Next Pokémon Button', () => {
    const nextButton = screen.getByTestId('next-pokemon');
    expect(nextButton).toHaveTextContent('Próximo pokémon');
  });

  test('Tests filter buttons', () => {
    const buttonNames = [
      'Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    filterButtons.forEach((filterButton, index) => {
      expect(filterButton).toHaveTextContent(buttonNames[index]);
    });
  });

  test('Tests reset filters button', () => {
    const resetFiltersButton = screen.getByText('All');
    fireEvent.click(resetFiltersButton);
  });
});
