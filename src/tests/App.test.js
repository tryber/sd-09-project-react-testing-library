import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<App />);
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('Test the App component', () => {
  test('Renders a reading with the text `Pokédex`', () => {
    renderWithRouter(<App />);

    const heading = screen.getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('Tests if the main page is being rendered', () => {
    const { history } = renderWithRouter(<App />);
    const { location } = history;
    const { pathname } = location;
    expect(pathname).toBe('/');
  });

  test('Tests if the navigation bar has the links Home, About e Favorite pokémon',
    () => {
      renderWithRouter(<App />);

      const home = screen.getByText(/Home/i);
      expect(home).toBeInTheDocument();

      const about = screen.getByText(/About/i);
      expect(about).toBeInTheDocument();

      const faviritePokemon = screen.getByText(/Favorite pokémon/i);
      expect(faviritePokemon).toBeInTheDocument();
    });

  test('Tests if the page is redirected to the main page by clicking Home',
    () => {
      const { history } = renderWithRouter(<App />);

      const home = screen.getByText(/Home/i);
      expect(home).toBeInTheDocument();

      userEvent.click(home);
      const { location } = history;
      const { pathname } = location;
      expect(pathname).toBe('/');
    });

  test('Tests if the page is redirected to the about page by clicking on About',
    () => {
      const { history } = renderWithRouter(<App />);

      const about = screen.getByText(/About/i);
      expect(about).toBeInTheDocument();

      userEvent.click(about);
      const { location } = history;
      const { pathname } = location;
      expect(pathname).toBe('/about');
    });

  test(`Tests if the page is redirected to the favorite pokémon page by
  clicking on Favorite pokémon`,
  () => {
    const { history } = renderWithRouter(<App />);

    const favoritePokemon = screen.getByText(/Favorite pokémon/i);
    expect(favoritePokemon).toBeInTheDocument();

    userEvent.click(favoritePokemon);
    const { location } = history;
    const { pathname } = location;
    expect(pathname).toBe('/favorites');
  });

  test('Tests if the page is redirected to the not found page by typing an invalid URL',
    () => {
      const { history } = renderWithRouter(<App />);

      history.push('/not-founded');
      const { location } = history;
      const { pathname } = location;
      expect(pathname).toBe('/not-founded');

      const message = screen.getByText(
        'Page requested not found',
      );
      expect(message).toBeInTheDocument();
    });
});
