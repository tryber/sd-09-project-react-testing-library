import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requirement 1: Test the component <App.js />', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);

    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('Test if the links have the correct texts', () => {
    const { getByText } = renderWithRouter(<App />);

    const homeLink = getByText(/Home/i);
    expect(homeLink).toBeInTheDocument();

    const aboutLink = getByText(/About/i);
    expect(aboutLink).toBeInTheDocument();

    const favPokemonsLink = getByText(/Favorite Pokémons/i);
    expect(favPokemonsLink).toBeInTheDocument();
  });

  test('shows the Pokédex when the route is `/`', () => {
    const { getByText } = renderWithRouter(<App />);

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('Navigation to "/" when the user click on "Home"', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const homeLink = getByText(/Home/i);

    userEvent.click(homeLink);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  test('Navigation to "/about" when the user click on "About"', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const aboutLink = getByText(/About/i);

    userEvent.click(aboutLink);
    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  test('Navigation to "/favorites" when the user click on "Favorite Pokémons"', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const favPokemonsLink = getByText(/Favorite Pokémons/i);

    userEvent.click(favPokemonsLink);
    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });
});
