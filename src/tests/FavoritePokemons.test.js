import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../helper/renderWithRouter';

describe('Requirement 03, test the FavoritePokemons.js component', () => {
  it('shows the message `No favorite pokemon found`', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });
});
