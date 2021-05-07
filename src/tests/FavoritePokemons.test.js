import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testing the <FavoritePokemons.js /> component', () => {
  test('if the message No favorite Pokémon found is applied on the screen', () => {
    renderWithRouter(<App />);
    const navFavoritePokémons = screen.getByRole('navigation').children[2];
    userEvent.click(navFavoritePokémons);
    const h2 = screen.getByRole('heading', {
      level: 2,
      name: /Favorite pokémons/,
    });
    expect(h2).toBeInTheDocument();
    const textNoFavorite = h2.nextElementSibling.textContent;
    expect(textNoFavorite).toMatch(/No favorite pokemon found/i);
  });
});
