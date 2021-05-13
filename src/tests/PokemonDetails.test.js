import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './help-test/renderWithRouter';
import App from '../App';

describe('Testes for the PokemonDetails component', () => {
  it('should show the detailed pokemon info', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);

    const detailsButton = getByRole('link', {
      name: /more details/i,
    });
    expect(detailsButton).toBeInTheDocument();

    fireEvent.click(detailsButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');

    expect(getByText(/Pikachu Details/i)).toBeInTheDocument();
    expect(detailsButton).not.toBeInTheDocument();

    const summary = getByRole('heading', {
      level: 2,
      name: /Summary/i,
    });

    expect(summary).toBeInTheDocument();

    expect(getByText(/roasts hard berries/i)).toBeInTheDocument();
  });

  it('should show map info about the pokemon', () => {
    const { getByRole, getAllByAltText } = renderWithRouter(<App />);

    const detailsButton = getByRole('link', {
      name: /more details/i,
    });
    expect(detailsButton).toBeInTheDocument();

    fireEvent.click(detailsButton);

    const locationsHeading = getByRole('heading', {
      level: 2,
      name: /Game Locations of Pikachu/i,
    });

    expect(locationsHeading).toBeInTheDocument();

    const locationMap = getAllByAltText(/Pikachu location/i);
    const url = [
      'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    ];
    expect(locationMap).toHaveLength(2);
    locationMap.forEach((map, index) => {
      expect(map).toBeInTheDocument();
      expect(map.src).toBe(url[index]);
    });
  });
  it('should be possible to favorite a pokemon on the details page', () => {
    const { getByRole, getByLabelText, getByAltText } = renderWithRouter(<App />);

    const detailsButton = getByRole('link', {
      name: /more details/i,
    });
    expect(detailsButton).toBeInTheDocument();

    fireEvent.click(detailsButton);
    const favoriteCheckButton = getByLabelText(/Pokémon favoritado?/);
    expect(favoriteCheckButton).toBeInTheDocument();

    fireEvent.click(favoriteCheckButton);
    const favoriteIcon = getByAltText(/Pikachu is marked as favorite/i);
    expect(favoriteIcon.src).toContain('/star-icon.svg');
  });
});
