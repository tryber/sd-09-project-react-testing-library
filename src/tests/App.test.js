import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('tests the component App.js', () => {
  it('renders the main page after loads URL path /`', () => {
    const { getByRole } = renderWithRouter(<App />);

    const heading = getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('contains navigation links on the top of the application', () => {
    const { getByRole } = renderWithRouter(<App />);

    const home = getByRole('link', {
      name: /Home/i,
    });

    const about = getByRole('link', {
      name: /About/i,
    });

    const favoritePokemons = getByRole('link', {
      name: /Favorite Pokémons/i,
    });

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritePokemons).toBeInTheDocument();
  });

  it('returns to main page by clicking in home link text', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    const homeLink = getByRole('link', {
      name: /Home/i,
    });

    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('goes to about page by clicking in about link text', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    const aboutLink = getByRole('link', {
      name: /About/i,
    });

    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('goes to favorite pokémons page by clicking in favorite pokémons link text', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    const favoritePokemons = getByRole('link', {
      name: /Favorite Pokémons/i,
    });

    userEvent.click(favoritePokemons);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('goes to Not found page by passing an unknown URL', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/unknown');

    const notfoundText = getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(notfoundText).toBeInTheDocument();
  });
});
