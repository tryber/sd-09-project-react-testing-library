import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

import pokemons from '../data';

describe.only('Testing the <Pokemon.js /> component', () => {
  test('renders a card with the information of a certain Pokémon.', () => {
    const { history } = renderWithRouter(<App />);

    expect(screen.getByTestId('pokemon-name')
      .textContent)
      .toBe('Pikachu');
    expect(screen.getByTestId('pokemonType')
      .textContent).toBe('Electric');
    expect(screen.getByTestId('pokemon-weight'))
      .toBeDefined();
    expect(screen.getByTestId('pokemon-weight').textContent)
      .toBe('Average weight: 6.0 kg');

    const urlImage = 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const altImage = 'Pikachu sprite';
    expect(screen.getByRole('img').src)
      .toBe(urlImage);
    expect(screen.getByRole('img').alt)
      .toBe(altImage);

    const linkDetails = screen.getByRole('link',
      {
        name: /More details/i,
      });
    fireEvent.click(linkDetails);
    expect('/pokemons/25').toBeDefined();
    expect(history.location.pathname).toBe('/pokemons/25');

    const favorite = screen.getByLabelText('Pokémon favoritado?');
    fireEvent.click(favorite);

    const linkFavorite = screen.getByText('Favorite Pokémons');
    fireEvent.click(linkFavorite);

    const pikachu = pokemons[0];
    const { name } = pikachu;
    const star = screen
      .getByRole('img', { name: `${name} is marked as favorite` });
    expect(star).toHaveAttribute('src', '/star-icon.svg');
  });
});
