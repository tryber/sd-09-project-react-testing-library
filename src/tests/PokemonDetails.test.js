import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Test \'PokemonDetails.js\' Component - Requirement 07', () => {
  it('Show correct pokemon infos', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);

    const detailsLink = getByText(/More details/i);

    userEvent.click(detailsLink);

    const detailsHeading = getByRole('heading', {
      level: 2,
      name: /Pikachu Details/,
    });
    const summaryHeading = getByRole('heading', {
      level: 2,
      name: /Summary/,
    });
    const resume = getByText(/This intelligent Pokémon roasts/i);

    expect(detailsHeading).toBeInTheDocument();
    expect(summaryHeading).toBeInTheDocument();
    expect(resume).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();
  });
  it('Renders pokemon location section', () => {
    const { getByText, getAllByAltText, getByRole } = renderWithRouter(<App />);
    const detailsLink = getByText(/More details/i);

    userEvent.click(detailsLink);

    const gameLocations = getByRole('heading', { name: /Game Locations of Pikachu/i });
    expect(gameLocations).toBeInTheDocument();

    const location = getByText(/Kanto Viridian Forest/i);
    expect(location).toBeInTheDocument();

    const images = getAllByAltText(/Pikachu location/i);
    expect(images).toHaveLength(2);
    expect(images[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(images[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  it('Is possible favorite a pokemon', () => {
    const { getByText, getByLabelText, getByRole } = renderWithRouter(<App />);
    const detailsLink = getByText(/More details/i);

    userEvent.click(detailsLink);

    const checkboxLabel = getByLabelText('Pokémon favoritado?');
    expect(checkboxLabel).toBeInTheDocument();

    const checkbox = getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();

    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
