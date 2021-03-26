import React from 'react';
import userEvent from '@testing-library/user-event';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

afterEach(cleanup);

describe('testing PokemonDetails component', () => {
  it('test if it has heading, Pokemon Name, and do not show any detailsLink', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const linkMDetails = getByText(/More Details/i);
    expect(linkMDetails).toBeInTheDocument();
    userEvent.click(linkMDetails);
    const titleName = getByText('Pikachu Details');
    expect(titleName).toBeInTheDocument();
    const headingH2 = getByRole('heading', { level: 2, name: /Summary/i });
    expect(headingH2).toBeInTheDocument();
    const paragraph = getByText(/This intelligent Pokémon roasts hard berries/i);
    expect(paragraph).toBeInTheDocument();
    expect(linkMDetails).not.toBeInTheDocument();
  });

  it('testing maps session', () => {
    const { getByRole, getByText, getAllByAltText } = renderWithRouter(<App />);
    const linkMDetails = getByText(/More Details/i);
    userEvent.click(linkMDetails);
    const headingH2 = getByRole('heading', { name: 'Game Locations of Pikachu' });
    expect(headingH2).toBeInTheDocument();
    const mapImages = getAllByAltText(/Pikachu location/i);
    expect(mapImages[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(mapImages[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  it('test if user can add to favorite any Pokemon on PokemonDetails', () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);
    const linkMDetails = getByText(/More Details/i);
    userEvent.click(linkMDetails);
    const FavPokemon = getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(FavPokemon);
    expect(FavPokemon).toBeChecked();
    userEvent.click(FavPokemon);
    expect(FavPokemon).not.toBeChecked();
  });
});
