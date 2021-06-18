import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testing App component', () => {
  it('shows the Pokédex when the route is `/`', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  it('verify that the links Home, About and Favorite Pokémons in `/` are working', () => {
    const { getByText } = renderWithRouter(<App />);

    const home = getByText(/home/i);
    const about = getByText(/about/i);
    const favoritesPokemons = getByText(/favorite/i);

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritesPokemons).toBeInTheDocument();
  });

  it('When Home link is clicked, it redirects to the home page', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText(/home/i);

    userEvent.click(home);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('When About link is clicked, it redirects to the about page', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const about = getByText(/about/i);

    userEvent.click(about);

    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  it('When favorites link is clicked, it redirects to the favorites page', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favoritesPokemons = getByText(/favorite/i);

    userEvent.click(favoritesPokemons);

    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });

  it('When an unexpected path is typed, return not found', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/any-page');

    const noMatch = getByText(/Page requested not found/i);

    expect(noMatch).toBeInTheDocument();
  });
});
