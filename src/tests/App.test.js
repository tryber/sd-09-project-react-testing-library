import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import renderWithRouter from './renderWithRouter';
import App from '../App';

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
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('o primeiro link possui o texto Home', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const firstLink = getByText(/Home/i);
  expect(firstLink).toBeInTheDocument();
});

test('o segundo link possui o texto About', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const secoundLink = getByText(/About/i);
  expect(secoundLink).toBeInTheDocument();
});

test('o terceiro link possui o texto Favorite Pokemóns', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const thirdLink = getByText(/Favorite Pokémons/i);
  expect(thirdLink).toBeInTheDocument();
});

test('a aplicação é direcionada para página inicial "/" ao clicar em Home', () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  fireEvent.click(getByText(/Home/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('verifica se ao clicar em About direciona para about', () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  fireEvent.click(getByText(/About/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('verifica se ao clicar em Favorite Pokémons direciona para favorites', () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  fireEvent.click(getByText(/Favorite Pokémons/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('tenta entrar com o pathname xablau', () => {
  const { getByText, history } = renderWithRouter(<App />);

  const route = '/xablau';
  history.push(route);

  const pageNotFound = getByText(/Page requested not found/i);
  expect(pageNotFound).toBeInTheDocument();
});
