import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import renderWithRouter from '../RenderWithRouter';

describe('testing PokemonDetails.js', () => {
  it('test if detailed information about the Pokémon is on screen', () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />);

    const moreDetails = getByText('More details');
    fireEvent.click(moreDetails);
    const pikachu = getByText('Pikachu Details');
    expect(pikachu).toBeInTheDocument();

    expect(moreDetails).not.toBeInTheDocument();

    const heading = getAllByRole('heading', { level: 2 })[1];
    expect(heading.textContent).toBe('Summary');

    const description = (getByText(/electricity to make them tender enough to eat/i));
    expect(description).toBeInTheDocument();
  });

  it('test if there is a section with the game locations of pokemon', () => {
    const { getByText, getAllByRole, getAllByAltText, getByAltText,
      history } = renderWithRouter(<App />);

    history.push('pokemons/65'); // definindo a nova rota

    const gameLocations = getByText('Game Locations of Alakazam');
    expect(gameLocations).toBeInTheDocument();

    const heading = getAllByRole('heading', { level: 2 })[2];
    expect(heading.textContent).toBe('Game Locations of Alakazam');

    const locations = getAllByAltText('Alakazam location');
    expect(locations.length).toBe(1);

    const nameLocation = getByText('Unova Accumula Town');
    expect(nameLocation).toBeInTheDocument();
    const mapImage = getByAltText('Alakazam location');
    expect(mapImage).toBeInTheDocument();
    expect(mapImage.src).toBe('https://cdn.bulbagarden.net/upload/4/44/Unova_Accumula_Town_Map.png');
  });

  it('test if the user can favor a pokémon through the details page', () => {
    const { getByLabelText, history } = renderWithRouter(<App />);
    history.push('pokemons/65'); // Alakasan

    const favButton = getByLabelText(/Pokémon favoritado/i);
    expect(favButton).toBeInTheDocument();
    fireEvent.click(favButton);
    expect(favButton.checked).toBeTruthy();
  });
});
