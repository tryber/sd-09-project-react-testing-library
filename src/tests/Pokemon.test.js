import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Test Pokedex component', () => {
  test('Tests if a card with the information of a certain Pokémon is rendered.',
    () => {
      renderWithRouter(<App />);
      const pokename = screen.getByTestId('pokemon-name');
      expect(pokename).toBeDefined();
      expect(pokename.innerHTML).toBe('Pikachu');

      const pokeType = screen.getByTestId('pokemonType');
      expect(pokeType).toBeDefined();
      expect(pokeType.innerHTML).toBe('Electric');

      const pokeweight = screen.getByTestId('pokemon-weight');
      expect(pokeweight).toBeDefined();
      expect(pokeweight.innerHTML).toBe('Average weight: 6.0 kg');

      const pokeImage = screen.getByAltText(/Pikachu sprite/i);
      expect(pokeImage).toBeDefined();
      expect(pokeImage.src).toBe(
        'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      );
    });

  test(`Test if the Pokémon card indicated on the Pokédex contains
  anavigation link to view details of this Pokémon`,
  () => {
    const { history } = renderWithRouter(<App />);

    const linkDetails = screen.getByText(/More details/i);
    expect(linkDetails).toBeInTheDocument();

    userEvent.click(linkDetails);
    const { location } = history;
    const { pathname } = location;
    expect(pathname).toBe('/pokemons/25');

    const details = screen.getByText(/Pikachu Details/i);
    expect(details).toBeInTheDocument();
  });

  test('Tests if has a star in favorite pokemons', () => {
    const { history } = renderWithRouter(<App />);

    const linkDetails = screen.getByText(/More details/i);
    expect(linkDetails).toBeInTheDocument();

    userEvent.click(linkDetails);
    const { location } = history;
    const { pathname } = location;
    expect(pathname).toBe('/pokemons/25');

    const favorite = screen.getByText(/Pokémon favoritado?/i);
    expect(favorite).toBeInTheDocument();
    userEvent.click(favorite);

    history.push('/');
    const faviritePokemon = screen.getByText(/Favorite pokémons/i);
    expect(faviritePokemon).toBeInTheDocument();

    userEvent.click(faviritePokemon);
    const { location: local } = history;
    const { pathname: favoritePath } = local;
    expect(favoritePath).toBe('/favorites');

    const star = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(star).toBeInTheDocument();
    expect(star.src).toBe('http://localhost/star-icon.svg');
  });
});
