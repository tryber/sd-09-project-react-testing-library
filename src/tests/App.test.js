import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requirement 1', () => {
  test('if the main page of Pokédex is rendered in the root url', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
  });

  test('if the first link must have the text "Home"', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const homeLinkText = screen.getByRole('link', {
      name: /Home/i,
    });

    expect(homeLinkText).toBeInTheDocument();
  });

  test('if the second link must have the text "About"', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const aboutLinkText = screen.getByRole('link', {
      name: /About/i,
    });

    expect(aboutLinkText).toBeInTheDocument();
  });

  test('if the third link must have the text "Favorite Pokémons"', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const favoritePokemonsLinkText = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });

    expect(favoritePokemonsLinkText).toBeInTheDocument();
  });

  test('if by clicking on link "Home", the page is redirected to the root URL', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const linkOfHome = getByRole('link', {
      name: /Home/i,
    });
    userEvent.click(linkOfHome);
    expect(history.location.pathname).toBe('/');
  });

  test('if by clicking on link "About", the page is redirected to the /about', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const linkOfAbout = getByRole('link', {
      name: /About/i,
    });
    userEvent.click(linkOfAbout);
    expect(history.location.pathname).toBe('/about');
  });

  test('if by clicking on "Favorite Pokémons", is redirected to /favorites', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const linkOfFavoritePokemons = getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    userEvent.click(linkOfFavoritePokemons);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('if entering an unknown URL, is redirected to the "Not Found" page.', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    history.push('/whatever/');

    const notFound = getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });

    expect(notFound).toBeInTheDocument();
  });
});
