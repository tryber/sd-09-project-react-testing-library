import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Requirement 7', () => {
  test('if the details about the selected Pokémon is shown on the screen', () => {
    // The page must contain a text <name> Details, where <name> is the name of the Pokémon
    const { queryByText, getByRole } = renderWithRouter(<App />);

    userEvent.click(queryByText(/more details/i));

    expect(queryByText(`${pokemons[0].name} Details`)).toBeInTheDocument();

    // There should be no navigation link for the details of the selected Pokémon
    expect(queryByText(/more details/i)).not.toBeInTheDocument();

    // The details section must contain an heading h2 with the text Summary
    expect(getByRole('heading', { level: 2, name: 'Summary' }));

    // The details section should contain a paragraph with the summary of the specific Pokémon being viewed
    expect(queryByText(/this intelligent pokémon roasts hard/i)).toBeInTheDocument();
  });

  test('if there is a section with maps containing the locations of the pokémon', () => {
    const { queryByText, queryAllByAltText, getByRole } = renderWithRouter(<App />);

    userEvent.click(queryByText(/more details/i));

    expect(queryByText(/game locations/i)).toBeInTheDocument();

    const gameLocationsHeader = getByRole('heading', {
      level: 2,
      name: `Game Locations of ${pokemons[0].name}`,
    });

    expect(gameLocationsHeader).toBeInTheDocument();

    const locations = queryAllByAltText(/pikachu location/i);

    expect(locations.length).toEqual(2);
    expect(locations[0]).toHaveAttribute(
      'src',
      'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    );
    expect(locations[1]).toHaveAttribute(
      'src',
      'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    );
  });
  test('if the user can favor a pokémon through the details page.', () => {
    const { queryByText } = renderWithRouter(<App />);

    userEvent.click(queryByText(/more details/i));

    expect(queryByText(/pokémon favoritado/i)).toBeInTheDocument();
  });
});
