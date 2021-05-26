import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
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

test('Testa se a home está na URL /', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const home = getByText(/Encountered pokémons/);
  expect(home).toBeInTheDocument();
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('Teste se o topo da aplicação contém um conjunto fixo de link de navegação', () => {
  const { getByRole } = renderWithRouter(<App />);
  const nav = getByRole('navigation');
  expect(nav.children[0]).toHaveTextContent('Home');
  expect(nav.children[1]).toHaveTextContent('About');
  expect(nav.children[2]).toHaveTextContent('Favorite Pokémons');
});

test('Teste se ao clicar no botão Home redireciona para a URL /', () => {
  const { getByRole, history } = renderWithRouter(<App />);
  const nav = getByRole('navigation');
  fireEvent.click(nav.children[0]);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('Teste se ao clicar no botão About redireciona para a URL /about', () => {
  const { getByRole, history } = renderWithRouter(<App />);
  const nav = getByRole('navigation');
  fireEvent.click(nav.children[1]);
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('Teste se ao clicar no botão Favorite redireciona para a URL /favorite', () => {
  const { getByRole, history } = renderWithRouter(<App />);
  const nav = getByRole('navigation');
  fireEvent.click(nav.children[2]);
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('Teste se a página Not Found aparece entrar em uma URL desconhecida', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/urlDesconhecida');
  const noMatch = getByText(/Page requested not found/i);
  expect(noMatch).toBeInTheDocument();
});
