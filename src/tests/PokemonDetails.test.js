import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Testing <PokemonDetails.js />', () => {
  it('Should render the detailed informations about selected Pokémon', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const moreDetails = getByText(/More details/i);
    userEvent.click(moreDetails);

    const details = getByRole('heading', { name: /Pikachu Details/i });
    expect(details).toBeInTheDocument();

    const summary = getByRole('heading', { name: /Summary/i });
    expect(summary).toBeInTheDocument();

    const paragraph = getByText(/This intelligent Pokémon roasts hard berries/i);
    expect(paragraph).toBeInTheDocument();
  });

  it('Should render a section containing Pokémon locations', () => {
    const { getByText, getByRole, getAllByAltText } = renderWithRouter(<App />);
    const moreDetails = getByText(/More details/i);
    userEvent.click(moreDetails);

    const gameLocations = getByRole('heading', { name: /Game Locations of Pikachu/i });
    expect(gameLocations).toBeInTheDocument();

    const location = getByText(/Kanto Viridian Forest/i);
    expect(location).toBeInTheDocument();

    const images = getAllByAltText(/Pikachu location/i);
    expect(images).toHaveLength(2);
    expect(images[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(images[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('Should test if one can favorite a Pokémon', () => {
    const { getByText, getByLabelText, getByRole } = renderWithRouter(<App />);
    const moreDetails = getByText(/More details/i);
    userEvent.click(moreDetails);

    const label = getByLabelText('Pokémon favoritado?');
    expect(label).toBeInTheDocument();

    const checkbox = getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();

    userEvent.click(label);
    expect(label).toBeChecked();

    userEvent.click(label);
    expect(label).not.toBeChecked();
  });
});
