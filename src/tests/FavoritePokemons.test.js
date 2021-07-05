import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Test \'FavoritePokemons.js\' Component - Requirement 03', () => {
  it('Shows \'No favorite pokémons found\', when no favorite pokémons are register',
    () => {
      const { getByText } = renderWithRouter(<App />);
      fireEvent.click(getByText(/Favorite Pokémons/i));
      const noFavoriteFound = getByText(/No favorite pokemon found/i);
      expect(noFavoriteFound).toBeInTheDocument();
    });
});
