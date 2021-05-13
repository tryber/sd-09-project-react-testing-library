import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './help-test/renderWithRouter';
import App from '../App';

describe('App page', () => {
  test('should Pokédex route be `/`', () => {
    renderWithRouter(<App />);

    expect(screen.getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('should show a set of links at the top of the application', () => {
    renderWithRouter(<App />);

    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveTextContent(/Home/i);
    expect(links[1]).toHaveTextContent(/About/i);
    expect(links[2]).toHaveTextContent(/Favorite Pokémons/i);
  });

  test('should redirect the user to the home page by clicking on the Home link', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('should redirect the user to the About page by clicking on the about link', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('should redirect to the Favorite page by clicking on the Favorite link', () => {
    const { history } = renderWithRouter(<App />);

    const favoritesLink = screen.getByRole('link', { name: /favorite/i });
    userEvent.click(favoritesLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('should redirect to the page Not found when user entering an unknown url', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/not-found');

    const notFoundText = screen.getByText(/not found/i);
    expect(notFoundText).toBeInTheDocument();
  });
});
