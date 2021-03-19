import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

test('shows the Pokédex when the route is `/`', () => {
  renderWithRouter(<App />);

  expect(screen.getByText('Encountered pokémons')).toBeInTheDocument();
});

test('shows a fixed link set on the top of the application', () => {
  renderWithRouter(<App />);

  const links = screen.getAllByRole('link');
  expect(links[0]).toHaveTextContent(/Home/i);
  expect(links[1]).toHaveTextContent(/About/i);
  expect(links[2]).toHaveTextContent(/Favorite Pokémons/i);
});

test('the application redirects to "/" when "Home" is clicked', () => {
  const { history } = renderWithRouter(<App />);

  const homeLink = screen.getByRole('link', { name: /home/i });
  userEvent.click(homeLink);

  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('the application redirects to "/about" when "About" is clicked', () => {
  const { history } = renderWithRouter(<App />);

  const aboutLink = screen.getByRole('link', { name: /about/i });
  userEvent.click(aboutLink);

  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('the application redirects to "/favorites" when "Favorite P." is clicked', () => {
  const { history } = renderWithRouter(<App />);

  const favoritesLink = screen.getByRole('link', { name: /favorite/i });
  userEvent.click(favoritesLink);

  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('the application redirects to Not Found when a unknown URL is passed', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/not-found');

  const notFoundText = screen.getByText(/not found/i);
  expect(notFoundText).toBeInTheDocument();
});
