import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 1', () => {
  test('Se a página inicial do Pokedex está sendo renderizado na raiz', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
  });

  test('Se o primeiro link tem o texto HOME', () => {
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

  test('Se o segundo link tem o texto ABOUT', () => {
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

  test('Se o terceiro link tem o texto FAVORITE POKEMONS', () => {
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
  test('Se clicar no link HOME a URL é redirecionado para a raiz', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const linkOfHome = getByRole('link', {
      name: /Home/i,
    });
    userEvent.click(linkOfHome);
    expect(history.location.pathname).toBe('/');
  });

  test('Se clicar no link ABOUT a URL é direcionada para /about', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const linkOfAbout = getByRole('link', {
      name: /About/i,
    });
    userEvent.click(linkOfAbout);
    expect(history.location.pathname).toBe('/about');
  });

  test('Se clicar no link FAVORITE POKEMONS a URL é direcionada para /favorites', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const linkOfFavoritePokemons = getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    userEvent.click(linkOfFavoritePokemons);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Se clicar num link desconhecido a URL é direcionada para not found page', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    history.push('/whatever/');

    const notFound = getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });

    expect(notFound).toBeInTheDocument();
  });
});
