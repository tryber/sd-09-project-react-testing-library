import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('Requirement 07, testing the PokemonDetails.js component', () => {
  it('shows the details about the pokémon', () => {
    const { getByText, getByRole, getAllByRole } = renderWithRouter(<App />);
    const linkToDetailsPage = getByText('More details');
    const imageAlt = 'Pikachu location';
    fireEvent.click(linkToDetailsPage);
    const detailHeading = getByRole('heading', { level: 2, name: 'Pikachu Details' });
    const summarySectionHeading = getByRole('heading', { level: 2, name: 'Summary' });
    const gameLocationsHeading = getByRole(
      'heading', { level: 2, name: 'Game Locations of Pikachu' },
    );
    const imageLocation = getAllByRole('img');
    const summaryParagraph1 = 'This intelligent Pokémon roasts hard berries with ';
    const summaryParagraph2 = 'electricity to make them tender enough to eat.';
    const fullSummaryParagraph = summaryParagraph1 + summaryParagraph2;
    const summaryParagraph = getByText(fullSummaryParagraph);

    expect(detailHeading).toBeInTheDocument();
    expect(linkToDetailsPage).not.toBeInTheDocument();
    expect(summarySectionHeading).toBeInTheDocument();
    expect(gameLocationsHeading).toBeInTheDocument();
    expect(imageLocation.some((image) => image.alt === imageAlt)).toBeTruthy();
    expect(imageLocation
      .filter((image) => image.alt === imageAlt).length).toBe(2);
    expect(imageLocation.filter((image) => image.alt === imageAlt)[0].src).toEqual('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imageLocation.filter((image) => image.alt === imageAlt)[1].src).toEqual('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(summaryParagraph).toBeInTheDocument();
  });
  it('has the option to make the pokemon favorite', () => {
    const { history, getByLabelText } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const labelFavorite = getByLabelText('Pokémon favoritado?');
    expect(labelFavorite).toBeInTheDocument();
  });
});
