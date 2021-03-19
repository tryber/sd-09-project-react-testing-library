import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requirement 7: Test the component <PokemonDetails.js />', () => {
  test('Tests if detailed info from the Pokémon are shown', () => {
    const { getAllByRole, getByText } = renderWithRouter(<App />);

    const detailsLink = getByText('More details');
    userEvent.click(detailsLink);
    expect(detailsLink).not.toBeInTheDocument();

    const pokeHeadings = getAllByRole('heading');
    expect(pokeHeadings[1].textContent).toBe('Pikachu Details');
    expect(pokeHeadings[2].textContent).toBe(' Summary ');

    const pokeSummary = getByText(/roasts hard berries with electricity/i);
    expect(pokeSummary).toBeInTheDocument();
  });

  test('Test if there is a maps section with Pokémon locations', () => {
    const { getByRole, getAllByRole } = renderWithRouter(<App />);

    // Solução para evitar erro ESLint de duplicidade
    // no código por: Layo Kaminski
    const detailsLink = getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(detailsLink);
    // --------------------------------------

    const pokeGameLocations = getByRole('heading', {
      level: 2,
      name: /game locations/i,
    });
    expect(pokeGameLocations.textContent).toBe('Game Locations of Pikachu');

    const pokeLocations = getAllByRole('img');
    expect(pokeLocations[2].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(pokeLocations[2].alt).toBe('Pikachu location');
    expect(pokeLocations[1].alt).toBe('Pikachu location');
  });

  test('Tests if the user can favorite a Pokémon at details page', () => {
    const { getByLabelText, getByText } = renderWithRouter(<App />);

    const detailsLink = getByText('More details');
    userEvent.click(detailsLink);

    const pokeFav = getByLabelText('Pokémon favoritado?');
    userEvent.click(pokeFav);
    expect(pokeFav).toBeInTheDocument();
    expect(pokeFav.checked).toBe(true);

    userEvent.click(pokeFav);
    expect(pokeFav.checked).toBe(false);
  });
});
