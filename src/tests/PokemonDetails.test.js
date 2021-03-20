import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Tests the PokemonDetails component', () => {
  test(`Tests if detailed information about the selected Pokémon appears on
  the screen`, () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByText(/More details/i);
    userEvent.click(linkDetails);

    const detailsHeading = screen.getByRole('heading', { name: 'Pikachu Details' });
    expect(detailsHeading).toBeInTheDocument();

    expect(linkDetails).not.toBeInTheDocument();

    const sumaryHeading = screen.getByRole('heading', { name: 'Summary' });
    expect(sumaryHeading).toBeInTheDocument();

    const paragraph = 'This intelligent Pokémon roasts hard berries with';
    const paragraphContinue = 'electricity to make them tender enough to eat.';
    const paragraphDetails = screen.getByText(`${paragraph} ${paragraphContinue}`);
    expect(paragraphDetails).toBeInTheDocument();
  });

  test(`Test if there is a section on the page with maps containing the
  locations of the pokémon`, () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByText(/More details/i);
    userEvent.click(linkDetails);

    const locationHeading = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });
    expect(locationHeading).toBeInTheDocument();

    const locationOne = screen.getByText(/Kanto Viridian Forest/i);
    const locationTwo = screen.getByText(/Kanto Power Plant/i);
    expect(locationOne && locationTwo).toBeInTheDocument();

    const locationMap = screen.getAllByRole('img', { name: 'Pikachu location' });
    locationMap.forEach((map, index) => {
      expect(map).toBeInTheDocument();
      switch (index) {
      case 0:
        expect(map.src).toBe(
          'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
        );
        break;
      case 1:
        expect(map.src).toBe(
          'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
        );
        break;
      default:
        break;
      }
    });
    expect(locationMap.length).toBe(2);
  });

  test('Tests if the user can add a Pokémon as a favorite on the details page', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByText(/More details/i);
    userEvent.click(linkDetails);

    const addfavoritePokemon = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });
    expect(addfavoritePokemon).toBeInTheDocument();
    userEvent.click(addfavoritePokemon);

    const star = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(star).toBeInTheDocument();
    expect(star.src).toBe('http://localhost/star-icon.svg');

    userEvent.click(addfavoritePokemon);
    expect(star).not.toBeInTheDocument();
  });
});
