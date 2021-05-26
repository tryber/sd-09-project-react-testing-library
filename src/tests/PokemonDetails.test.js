import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';
import Pokemons from '../data';

const MORE_DETAILS = 'More details';

describe('test PokemonDetails component', () => {
  it('test if all details of the select pokemon is shown', () => {
    renderWithRouter(<App />);
    const detailsButton = screen.getByRole('link', { name: MORE_DETAILS });
    userEvent.click(detailsButton);

    const details = screen.getByRole('heading', { level: 2, name: 'Pikachu Details' });
    expect(details).toBeInTheDocument();

    const summary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(summary).toBeInTheDocument();

    const paragraph = screen.getByText(/This intelligent/i);
    expect(paragraph).toBeInTheDocument();
  });

  it('test if there is a section showing maps and location of that pokemon', () => {
    renderWithRouter(<App />);
    const detailsButton = screen.getByRole('link', { name: MORE_DETAILS });
    userEvent.click(detailsButton);

    const locationsHeading = screen.getByRole(
      'heading', { level: 2, name: 'Game Locations of Pikachu' },
    );
    expect(locationsHeading).toBeInTheDocument();

    const locationsList = screen.getAllByAltText('Pikachu location');
    expect(locationsList).toHaveLength(2);
    locationsList.forEach((location, index) => {
      expect(location).toHaveAttribute('src', Pokemons[0].foundAt[index].map);
    });
  });

  it('test if a pokemon can be favorited', () => {
    renderWithRouter(<App />);
    const detailsButton = screen.getByRole('link', { name: MORE_DETAILS });
    userEvent.click(detailsButton);

    const favoriteCheck = screen.getByLabelText('Pokémon favoritado?');
    expect(favoriteCheck).not.toBeChecked();
    userEvent.click(favoriteCheck);
    expect(favoriteCheck).toBeChecked();
  });
});
