import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('Renderiza um titulo contendo a palavra `Pokédex`', () => {
  renderWithRouter(<App />);

  const heading = screen.getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('Se há 3 Links com os nomes `Home`, `About` e `Favorite Pokémons`', () => {
  renderWithRouter(<App />);

  const home = screen.getByText('Home');
  const about = screen.getByText('About');
  const favorite = screen.getByText('Favorite Pokémons');

  expect(home).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(favorite).toBeInTheDocument();
});

test('Se os links redirecionam as páginas corretas', () => {
  const { history } = renderWithRouter(<App />);

  // Home
  fireEvent.click(screen.getByText('Home'));
  const pathHome = history.location.pathname;
  const home = screen.getByText('Encountered pokémons');
  expect(pathHome).toBe('/');
  expect(home).toBeInTheDocument();

  // About
  fireEvent.click(screen.getByText('About'));
  const pathAbout = history.location.pathname;
  const about = screen.getByText('About Pokédex');
  expect(pathAbout).toBe('/about');
  expect(about).toBeInTheDocument();

  // Favorite Pokémons
  fireEvent.click(screen.getByText('Favorite Pokémons'));
  const pathFavorite = history.location.pathname;
  const favorite = screen.getByText('Favorite pokémons');
  expect(pathFavorite).toBe('/favorites');
  expect(favorite).toBeInTheDocument();

  // NotFound
  history.push('/paginanãoexiste');
  const notFound = screen.getByText('Page requested not found');
  expect(notFound).toBeInTheDocument();
});
