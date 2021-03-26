import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test PokemonDetails component', () => {
  test('Detail info about a Pokemon is rendered', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByText(/More details/i);

    userEvent.click(detailsLink);

    const heading2Details = screen.getByRole('heading', {
      level: 2,
      name: /Pikachu Details/,
    });
    const heading2Summary = screen.getByRole('heading', {
      level: 2,
      name: /Summary/,
    });
    const paragraph = screen.getByText(/This intelligent Pokémon roasts/i);

    expect(heading2Details).toBeInTheDocument();
    expect(heading2Summary).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();
  });

  test('Map section is rendered with pokemon location', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByText(/More details/i);

    userEvent.click(detailsLink);

    const heading2Location = screen.getByRole('heading', {
      level: 2,
      name: /Game Locations of Pikachu/,
    });

    const location1Name = screen.getByText('Kanto Viridian Forest');
    const location2Name = screen.getByText('Kanto Power Plant');
    const pokemonLocations = screen.getAllByAltText('Pikachu location');

    expect(pokemonLocations[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(pokemonLocations[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(location1Name).toBeInTheDocument();
    expect(location2Name).toBeInTheDocument();
    expect(heading2Location).toBeInTheDocument();
  });

  test('User can favorite a Pokemon in Details page', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByText(/More details/i);

    userEvent.click(detailsLink);

    const favoriteCheckbox = screen.getByLabelText('Pokémon favoritado?');

    userEvent.click(favoriteCheckbox);

    const starIcon = screen.getByAltText('Pikachu is marked as favorite');

    expect(starIcon).toBeInTheDocument();
    expect(starIcon.src).toContain('http://localhost/star-icon.svg');

    userEvent.click(favoriteCheckbox);

    expect(starIcon).not.toBeInTheDocument();
  });
});
