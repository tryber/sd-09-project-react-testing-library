import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Pokemons from '../data';

describe('Test the PokemonDetails.js component', () => {
  test('detailed information about the selected Pokémon is shown on the screen', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const link = getByRole('link', { name: /more details/i });
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    expect(getByRole('heading', { name: /Pikachu Details/i })).toBeInTheDocument();
    expect(link).not.toBeInTheDocument();
    expect(getByRole('heading', { level: 2, name: 'Summary' })).toBeInTheDocument();
    expect(getByText(Pokemons[0].summary)).toBeInTheDocument();
  });

  test('there is a section with maps containing the locations of the pokémon', () => {
    const { getByRole, getByText, getAllByRole } = renderWithRouter(<App />);
    const link = getByRole('link', { name: /more details/i });
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    expect(getByRole('heading', {
      level: 2, name: 'Game Locations of Pikachu' })).toBeInTheDocument();

    const { foundAt } = Pokemons[0];
    foundAt.forEach((found, index) => {
      expect(getByText(found.location)).toBeInTheDocument();
      expect(getAllByRole('img', { name: 'Pikachu location' })[index])
        .toHaveAttribute('src', found.map);
    });
  });

  test('the user can bookmark a pokémon through the details page', () => {
    const { getByRole } = renderWithRouter(<App />);
    const link = getByRole('link', { name: /more details/i });
    expect(link).toBeInTheDocument();
    userEvent.click(link);

    const checkbox = getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(checkbox).toBeInTheDocument();

    userEvent.click(checkbox);
    const star = getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(star).toBeInTheDocument();

    userEvent.click(checkbox);
    expect(star).not.toBeInTheDocument();
  });
});
