import React from 'react';
import '@testing-library/react/dont-cleanup-after-each';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Chekcs if PokemonDetails component is working properly', () => {
  const { getByRole,
    getByText,
    getAllByAltText,
    getAllByText } = renderWithRouter(<App />);
  const detailsLink = getByRole('link', { name: 'More details' });
  fireEvent.click(detailsLink);
  it('checks if correct info is displayed', () => {
    const headingDetails = getByRole('heading', { level: 2, name: /Details/ });
    const headingSummary = getByRole('heading', { level: 2, name: /Summary/ });
    const summaryDescription = getByText(/electricity/);
    expect(headingDetails).toHaveTextContent('Pikachu Details');
    expect(headingSummary).toBeInTheDocument();
    expect(summaryDescription).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();
  });
  it('checks map section', () => {
    const headingMap = screen.getByRole('heading', { level: 2, name: /Game Locations/ });
    const listOfLocationsImages = getAllByAltText('Pikachu location');
    const namesOfLocations = getAllByText(/Kanto/);
    expect(headingMap).toHaveTextContent('Game Locations of Pikachu');
    expect(listOfLocationsImages).toHaveLength(2);
    namesOfLocations.forEach((location) => expect(location).toBeInTheDocument());
    listOfLocationsImages.forEach((location) => (
      expect(location.src).toContain('bulbagarden')));
  });
  it('checks favorite checkbox functionality', () => {
    const checkboxFavorite = getByRole('checkbox');
    const labelCheckbox = getByText('Pokémon favoritado?');
    expect(labelCheckbox).toBeInTheDocument();
    expect(checkboxFavorite).toBeInTheDocument();
    fireEvent.click(checkboxFavorite);
    expect(checkboxFavorite).toBeChecked();
    fireEvent.click(checkboxFavorite);
    expect(checkboxFavorite).not.toBeChecked();
  });
});
