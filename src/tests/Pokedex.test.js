import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import data from '../data';
import App from '../App';

describe('Test <Pokedex /> component', () => {
  it('should', () => {
    const { getByRole } = renderWithRouter(<App />);
    const h2 = getByRole('heading', { level: 2, name: 'Encountered pokémons' });
    expect(h2).toBeInTheDocument();
  });

  it('should render next Pokemon when button "Próximo pokémon" is clicked', () => {
    const { getByTestId, getAllByTestId, getByText } = renderWithRouter(<App />);
    const nextButton = getByTestId('next-pokemon');
    expect(nextButton.textContent).toBe('Próximo pokémon');
    const pokemonName = getAllByTestId('pokemon-name');
    expect(getByText('Pikachu')).toBeInTheDocument();
    expect(pokemonName.length).toBe(1);
    data.forEach(() => {
      userEvent.click(nextButton);
      expect(pokemonName.length).toBe(1);
    });
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  it('should display all filters buttons', () => {
    const { getAllByTestId, getByRole } = renderWithRouter(<App />);
    const filterButtons = getAllByTestId('pokemon-type-button');
    filterButtons.forEach(({ textContent }) => {
      expect(getByRole('button', { name: textContent })).toBeInTheDocument();
    });
  });
  it('should have a reset button', () => {
    const { getByRole, getByText, queryByText } = renderWithRouter(<App />);
    const allButton = getByRole('button', { name: 'All' });
    expect(allButton).toBeDefined();
    const dragonButton = getByRole('button', { name: 'Dragon' });
    userEvent.click(dragonButton);
    expect(allButton).toBeDefined();
    expect(getByText('Dragonair')).toBeInTheDocument();
    expect(queryByText('Pikachu')).not.toBeInTheDocument();
    userEvent.click(allButton);
    expect(getByText('Pikachu')).toBeInTheDocument();
  });
});
