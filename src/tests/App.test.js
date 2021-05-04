import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const linkHome = getByText(/Home/i);
  expect(linkHome).toBeInTheDocument();
  const linkAbout = getByText(/About/i);
  expect(linkAbout).toBeInTheDocument();
  const linkFavorites = getByText(/Favorite Pokémons/i);
  expect(linkFavorites).toBeInTheDocument();
});

test('Carrega a página inicial, na URL / ao clicar em Home', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const linkHome = getByText(/Home/i);
  fireEvent.click(linkHome);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('Carrega a página About, na URL /about ao clicar em About', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const linkAbout = getByText(/About/i);
  fireEvent.click(linkAbout);
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('Carrega a pág. Favorites, na URL /favorites ao clicar em Favorite Pokémons', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const linkFavorites = getByText(/Favorite Pokémons/i);
  fireEvent.click(linkFavorites);
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('Carrega a pág. Not Found ao acessar uma URL desconhecida', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const nonExistingRoute = '/xablau';
  history.push(nonExistingRoute);
  const notFound = getByText(/Page requested not found/i);
  expect(notFound).toBeInTheDocument();
});
