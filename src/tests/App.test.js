import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
  // expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('Teste se a página principal da Pokédex é renderizada', () => {
  const { history } = renderWithRouter(<App />);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  const { getByText } = renderWithRouter(<App />);
  const home = getByText(/home/i);
  const about = getByText(/about/i);
  const favoritePokemons = getByText(/favorite\spokémons/i);

  expect(home).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(favoritePokemons).toBeInTheDocument();
});

test('Teste se a aplicação é redirecionada para a página inicial', () => {
  const { history, getByText } = renderWithRouter(<App />);

  const home = getByText(/home/i);
  expect(home).toBeInTheDocument();

  userEvent.click(home);
  const { pathname: homePath } = history.location;
  expect(homePath).toBe('/');
});

test('Teste se a aplicação é redirecionada para a página about', () => {
  const { history, getByText } = renderWithRouter(<App />);

  const about = getByText(/about/i);
  expect(about).toBeInTheDocument();

  userEvent.click(about);
  const { pathname: aboutPath } = history.location;
  expect(aboutPath).toBe('/about');
});

test('Teste se a aplicação é redirecionada para a página favoritos', () => {
  const { history, getByText } = renderWithRouter(<App />);

  const favoritePokemons = getByText(/favorite\spokémons/i);
  expect(favoritePokemons).toBeInTheDocument();

  userEvent.click(favoritePokemons);
  const { pathname: favoritePath } = history.location;
  expect(favoritePath).toBe('/favorites');
});

test('Acessando página não encontrada', () => {
  const { history, getByText } = renderWithRouter(<App />);

  const route = '/pokimon';
  history.push(route); // push simula a digitação na barra de navegação

  const pageNotFound = getByText(/Page requested not found/i);
  expect(pageNotFound).toBeInTheDocument();
});
