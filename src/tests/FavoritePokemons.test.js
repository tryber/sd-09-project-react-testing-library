import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('Tests favorites page', () => {
  it('tests if correct text is displayed', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const notFoundText = getByText(/No favorite pokemon found/);
    expect(notFoundText).toBeInTheDocument();
  });
  it('tests if favorite pokemon are displayed', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    fireEvent.click(getByRole('link', { name: /More details/ }));
    fireEvent.click(getByRole('checkbox'));
    fireEvent.click(getByRole('link', { name: /Favorite Pokémons/ }));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const starImage = getByRole('img', { name: /favorite/ });
    expect(starImage).toBeInTheDocument();
  });
});
