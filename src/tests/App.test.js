import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../RenderWithRouter';

describe('checking that the routes are correct', () => {
  it('route to home', () => {
    const { getByText } = renderWithRouter(<App />);

    const home = getByText('Encountered pokémons');
    expect(home).toBeInTheDocument();
    fireEvent.click(getByText('Home'));
    expect(home).toBeInTheDocument();
  });

  it('route to about', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />);

    const about = getByText('About');
    expect(about).toBeInTheDocument();
    fireEvent.click(about);
    const aboutPage = getByAltText('Pokédex');
    expect(aboutPage).toBeInTheDocument();
  });

  it('route to favorite pokemons', () => {
    const { getByText } = renderWithRouter(<App />);

    const favoritePokemons = getByText('Favorite Pokémons');
    expect(favoritePokemons).toBeInTheDocument();
    fireEvent.click(favoritePokemons);
    const aboutPage = getByText('Favorite pokémons');
    expect(aboutPage).toBeInTheDocument();
  });
});
