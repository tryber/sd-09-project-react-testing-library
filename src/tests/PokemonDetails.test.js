import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('7- Test component <PokemonDetails.js />', () => {
  it('Should render details about pokemon selected.', () => {
    const { getByText } = renderWithRouter(<App />);
    const linkMoreDetails = getByText(/more details/i);

    userEvent.click(linkMoreDetails);

    const nameDetails = getByText(/pikachu details/i);
    const summaryText = getByText(/summary/i);
    const correctText = (
      /this intelligent pokémon roasts hard berries with electricity to make them/i
    );
    const underSummaryText = getByText(correctText);

    expect(nameDetails).toBeInTheDocument();
    expect(summaryText).toBeInTheDocument();
    expect(underSummaryText).toBeInTheDocument();
  });

  it('Should have maps about location of pokemon selected.', () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />);
    const linkMoreDetails = getByText(/more details/i);

    userEvent.click(linkMoreDetails);

    const gameLocationsText = getByText(/game locations of pikachu/i);

    expect(gameLocationsText).toBeInTheDocument();

    const images = getAllByRole('img');
    const arrayAlts = images.map((image) => image.alt);

    const link1 = 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const link2 = 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const link3 = 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';

    expect(arrayAlts[0]).toBe('Pikachu sprite');
    expect(arrayAlts[1]).toBe('Pikachu location');
    expect(arrayAlts[2]).toBe('Pikachu location');
    expect(images[0].src).toBe(link1);
    expect(images[1].src).toBe(link2);
    expect(images[2].src).toBe(link3);
  });

  it('shoul have `Pokémon favoritado?`', () => {
    const { getByText } = renderWithRouter(<App />);
    const linkMoreDetails = getByText(/more details/i);

    userEvent.click(linkMoreDetails);

    const favoritedPokemon = getByText(/pokémon favoritado/i);
    expect(favoritedPokemon).toBeInTheDocument();
  });
});
