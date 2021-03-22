import React from 'react';
import { within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Test <App />', () => {
  const navLinks = ['Home', 'About', 'Favorite Pokémons'];

  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('renders three <Link />s with texts Home, About and Favorite Pokemon', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const navBar = getByRole('navigation');
    // Look for links only inside nav
    const links = within(navBar).getAllByRole('link');
    const homeLink = getByText(navLinks[0]);
    const aboutLink = getByText(navLinks[1]);
    const favoriteLink = getByText(navLinks[2]);

    expect(links.length).toBe(navLinks.length);
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });

  it('redirects to / when clicking on "Home"', () => {
    const { history, getByRole } = renderWithRouter(<App />);
    const homeLink = getByRole('link', { name: navLinks[0] });

    userEvent.click(homeLink);
    const { location: { pathname } } = history;
    const text = getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });

    expect(pathname).toBe('/');
    expect(text).toBeInTheDocument();
  });

  it('redirects to /about when clicking on "About"', () => {
    const { history, getByRole } = renderWithRouter(<App />);
    const aboutLink = getByRole('link', { name: navLinks[1] });

    userEvent.click(aboutLink);
    const { location: { pathname } } = history;
    const text = getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });

    expect(pathname).toBe('/about');
    expect(text).toBeInTheDocument();
  });

  it('redirects to /favorites when clicking on "Favorite Pokémons"', () => {
    const { history, getByRole } = renderWithRouter(<App />);
    const favoriteLink = getByRole('link', { name: navLinks[2] });

    userEvent.click(favoriteLink);
    const { location: { pathname } } = history;
    const text = getByRole('heading', {
      level: 2,
      name: /Favorite pokémons/i,
    });

    expect(pathname).toBe('/favorites');
    expect(text).toBeInTheDocument();
  });
});
