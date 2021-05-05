import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import data from '../data';

describe('Component <PokemonDetails.js /> Test', () => {
  const button = 'More details';
  test('renders pokémon details info', () => {
    const { getByRole, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const link = getByText(button);
    userEvent.click(link);
    const details = getByText('Pikachu Details');
    expect(details).toBeInTheDocument();
    expect(link).not.toBeInTheDocument();
    const heading = getByRole('heading', { level: 2, name: 'Summary' });
    expect(heading).toBeInTheDocument();
    const paragraph = getByText(/This intelligent Pokémon/i);
    expect(paragraph).toBeInTheDocument();
  });

  test('renders a section with pokémon location maps', () => {
    const { getByText, getAllByAltText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const link = getByText(button);
    userEvent.click(link);
    const locations = getByText('Game Locations of Pikachu');
    expect(locations).toBeInTheDocument();
    const maps = getAllByAltText('Pikachu location');
    expect(maps).toHaveLength(2);
    maps.forEach((location, index) => {
      expect(location).toHaveAttribute('src', data[0].foundAt[index].map);
    });
  });

  test('pokémon can be favorited', () => {
    const { getByText, getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const link = getByText(button);
    userEvent.click(link);
    const favorite = getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(favorite).not.toBeChecked();
    userEvent.click(favorite);
    expect(favorite).toBeChecked();
  });
});
