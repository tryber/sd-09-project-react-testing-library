import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test App component', () => {
  test('Renders a heading with the text `Pokédex`', () => {
    renderWithRouter(<App />);

    const heading = screen.getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('Renders with links with specific texts', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByText(/home/i);
    const aboutLink = screen.getByText(/about/i);
    const favoriteLink = screen.getByText(/Favorite Pokémons/i);

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });

  test('Home link redirects to the homepage', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByText(/home/i);

    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });

  test('About link redirects to the about page', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByText(/about/i);

    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });

  test('Favorite link redirects to the favorite pokémons page', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.getByText(/Favorite Pokémons/i);

    userEvent.click(favoriteLink);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Redirects to NotFound page when needed', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/notfound');

    expect(history.location.pathname).toBe('/notfound');

    const notfound = screen.getByText(/not found/);

    expect(notfound).toBeInTheDocument();
  });
});
