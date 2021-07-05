import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('A págnia principal da Pokedex é carregada ao acessar caminho de URL /', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const heading = getByText(/Pokédex/i);

  expect(heading).toBeInTheDocument();
  expect(history.location.pathname).toBe('/');
});

test('O primeiro link deve possuir o texto `Home` com a URL `/`', () => {
  const { getByText, history } = renderWithRouter(<App />);

  fireEvent.click(getByText(/Home/));
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('O segundo link deve possuir o texto `About` com a URL `/about`', () => {
  const { getByText, history } = renderWithRouter(<App />);

  fireEvent.click(getByText(/About/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('Esse link deve possuir o texto `Favorite Pokémons` com a URL `/favorites`', () => {
  const { getByText, history } = renderWithRouter(<App />);

  fireEvent.click(getByText(/Favorite Pokémons/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('Teste se a aplicação é redirecionada para a página inicial', () => {
  const { getByText, history } = renderWithRouter(<App />);

  fireEvent.click(getByText(/Home/));
  const { pathname } = history.location;
  expect(pathname).toBe('/');
  const heading = getByText(/Pokédex/);
  expect(heading).toBeInTheDocument();
});

test('Teste se a aplicação é redirecionada para a página about', () => {
  const { getByText, history } = renderWithRouter(<App />);

  fireEvent.click(getByText(/About/));
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
  const heading = getByText(/About Pokédex/);
  expect(heading).toBeInTheDocument();
});

test('Teste se a aplicação é redirecionada para a página favorites', () => {
  const { getByText, history } = renderWithRouter(<App />);

  fireEvent.click(getByText(/Favorite Pokémons/));
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
  const heading = getByText(/Favorite pokémons/);
  expect(heading).toBeInTheDocument();
});
