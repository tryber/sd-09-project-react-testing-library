import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

afterEach(cleanup);

const testIfClickOnLinkRoutesTo = (linkText, linkPath) => {
  const { history } = renderWithRouter(<App />);
  const homeLink = screen.getByText(linkText);
  userEvent.click(homeLink);
  const { location: { pathname } } = history;
  expect(pathname).toBe(linkPath);
};

describe('App.js tests', () => {
  it('should render Pokedéx at "/" path', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
    const pokedexHeading = screen
      .getByRole('heading', { level: 1, name: 'Pokédex' });
    expect(pokedexHeading).toBeInTheDocument();
  });
  it('should render all nav links', () => {
    renderWithRouter(<App />);
    const navLinks = screen.queryAllByRole('link');
    expect(navLinks[0]).toHaveTextContent('Home');
    expect(navLinks[0]).toHaveAttribute('href', '/');
    expect(navLinks[1]).toHaveTextContent('About');
    expect(navLinks[1]).toHaveAttribute('href', '/about');
    expect(navLinks[2]).toHaveTextContent('Favorite Pokémons');
    expect(navLinks[2]).toHaveAttribute('href', '/favorites');
  });
  it('should route to "/" on clicking the Home link', () => {
    testIfClickOnLinkRoutesTo('Home', '/');
  });
  it('should route to "/about" on clicking the About link', () => {
    testIfClickOnLinkRoutesTo('About', '/about');
  });
  it('should route to "/favorites" on clicking the Favorite Pokémons link', () => {
    testIfClickOnLinkRoutesTo('Favorite Pokémons', '/favorites');
  });
  it('should route to "Not Found" page on accessing a non routed path', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/dummypage');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/dummypage');
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});
