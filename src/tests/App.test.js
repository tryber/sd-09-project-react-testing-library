import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testin <App.js />', () => {
  it('should render the text `Pokédex` when loading in the "/" path', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/);
    expect(heading).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('should have three navigation links at the top', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText(/Home/);
    expect(home).toBeInTheDocument();
    const about = getByText(/About/);
    expect(about).toBeInTheDocument();
    const favoritePokemons = getByText(/Favorite Pokémons/);
    expect(favoritePokemons).toBeInTheDocument();
  });

  describe('Test app`s redirectioning', () => {
    it('should be redirected to "/", when clicking Home', () => {
      const { getByText, history } = renderWithRouter(<App />);
      const home = getByText(/Home/);
      userEvent.click(home);
      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });

    it('should be redirected to "/about", when clicking About', () => {
      const { getByText, history } = renderWithRouter(<App />);
      const about = getByText(/About/);
      userEvent.click(about);
      const { pathname } = history.location;
      expect(pathname).toBe('/about');
    });

    it('should be redirected to "/favorites", when clicking Favorite Pokémons', () => {
      const { getByText, history } = renderWithRouter(<App />);
      const favorites = getByText(/Favorite Pokémons/);
      userEvent.click(favorites);
      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });

    it('should show a "Not found" message when landing on a bad page', () => {
      const { getByText, history } = renderWithRouter(<App />);
      history.push('/path--that-does-not-match');
      const notFound = getByText(/Page requested/);
      expect(notFound).toBeInTheDocument();
    });
  });
});
