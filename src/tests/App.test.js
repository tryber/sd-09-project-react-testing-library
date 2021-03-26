import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Requirement number one', () => {
  it('contains Home, About and Favorites Pokémon.', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const pageLinks = getAllByRole('link');
    expect(pageLinks[0].innerHTML).toBe('Home');
    expect(pageLinks[1].innerHTML).toBe('About');
    expect(pageLinks[2].innerHTML).toBe('Favorite Pokémons');
  });

  it('redirects to Home "/"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homeLink = getByText(/home/i);
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);
    const { pathname: home } = history.location;
    expect(home).toBe('/');
  });

  it('redirects to About "/about"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const aboutLink = getByText(/about/i);
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);
    const { pathname: about } = history.location;
    expect(about).toBe('/about');
  });

  it('redirects to Favorite Pokémons "/favorites"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favoritesLink = getByText(/Favorite Pokémons/i);
    expect(favoritesLink).toBeInTheDocument();
    userEvent.click(favoritesLink);
    const { pathname: favorites } = history.location;
    expect(favorites).toBe('/favorites');
  });
});
