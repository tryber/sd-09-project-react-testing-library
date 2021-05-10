import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test <PokemonDetails /> component', () => {
  it('should display selected pokemon info', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const moreDetails = getByRole('link', { name: 'More details' });
    expect(moreDetails).toBeDefined();
    userEvent.click(moreDetails);
    expect(getByText('Pikachu Details')).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
    const h2 = getByRole('heading', { name: 'Summary' });
    expect(h2).toBeInTheDocument();
    const paragraph = getByText(/This intelligent Pokémon/);
    expect(paragraph).toBeInTheDocument();
  });

  it('should have maps with pokemons locations', () => {
    const { getByRole, getByText, getAllByAltText } = renderWithRouter(<App />);
    const moreDetails = getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);
    const h2 = getByRole('heading', { name: 'Game Locations of Pikachu' });
    expect(h2).toBeInTheDocument();
    const imageLocations = getAllByAltText('Pikachu location');
    expect(imageLocations.length).toBe(2);
    expect(imageLocations[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imageLocations[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(getByText('Kanto Viridian Forest')).toBeInTheDocument();
    expect(getByText('Kanto Power Plant')).toBeInTheDocument();
  });

  it('should', () => {
    const { getByLabelText, history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const favoriteLabel = getByLabelText('Pokémon favoritado?');
    expect(favoriteLabel).toBeInTheDocument();
  });
});
