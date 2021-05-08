import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('7. Teste o componente <PokemonDetails.js />', () => {
  it('Test whether information about the selected Pokémon is shown on the screen', () => {
    const { getByRole, getAllByRole, getByText } = renderWithRouter(<App />);

    const linkMoreDetails = getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkMoreDetails);

    const pokemonSummary = getByText(/intelligent /i);

    const titles = getAllByRole('heading');
    expect(titles[1].textContent).toBe('Pikachu Details');
    expect(linkMoreDetails).not.toBeInTheDocument();
    expect(titles[2].textContent).toBe('Summary');
    expect(pokemonSummary).toBeInTheDocument();
  });

  it('Test if there are maps containing the locations of the pokémon', () => {
    const { getByRole, getAllByRole } = renderWithRouter(<App />);

    const linkMoreDetails = getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkMoreDetails);

    const gameLocationsTitle = getByRole('heading', {
      level: 2,
      name: /game locations/i,
    });

    const locationsPokemons = getAllByRole('img');
    const imageLocationPokemonSrc = 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';

    expect(gameLocationsTitle.textContent).toBe('Game Locations of Pikachu');
    expect(locationsPokemons[2].src).toBe(imageLocationPokemonSrc);
    expect(locationsPokemons[1].alt).toBe('Pikachu location');
    expect(locationsPokemons[2].alt).toBe('Pikachu location');
  });

  it('Test if the user can favor a Pokémon through the details page', () => {
    const { getByRole, getByLabelText } = renderWithRouter(<App />);

    const linkMoreDetails = getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkMoreDetails);

    const labelFavoritePokemon = getByLabelText('Pokémon favoritado?');
    userEvent.click(labelFavoritePokemon);

    expect(labelFavoritePokemon).toBeInTheDocument();
    expect(labelFavoritePokemon.checked).toBe(true);

    userEvent.click(labelFavoritePokemon);
    expect(labelFavoritePokemon.checked).toBe(false);
  });
});
