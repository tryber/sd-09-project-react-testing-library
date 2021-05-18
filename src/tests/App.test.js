import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
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

describe('Requisito 01 - Testes do App.js', () => {
  it('Pokédex é renderizado ao carregar a aplicação no caminho de URL "/"', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  it('O topo da aplicação contém um conjunto fixo de links de navegação', () => {
    const { getByText } = renderWithRouter(<App />);

    const home = getByText(/Home/i);
    const about = getByText(/About/i);
    const favoritePokemons = getByText(/Favorite Pokémons/i);

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritePokemons).toBeInTheDocument();
  });

  it('A aplicação é redirecionada para a página inicial,'
    + ' na URL "/" ao clicar no link Home da barra de navegação', () => {
    const { history, getByText } = renderWithRouter(<App />);

    const home = getByText(/Home/i);
    expect(home).toBeInTheDocument();

    userEvent.click(home);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  it('A aplicação é redirecionada para a página About,'
    + ' na URL "/about" ao clicar no link About da barra de navegação', () => {
    const { history, getByText } = renderWithRouter(<App />);

    const about = getByText(/About/i);
    expect(about).toBeInTheDocument();

    userEvent.click(about);
    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  it('A aplicação é redirecionada para a página Pokémons Favoritados, na URL "/favorites"'
    + ' ao clicar no link Pokémons Favoritados da barra de navegação', () => {
    const { history, getByText } = renderWithRouter(<App />);

    const favoritePokemons = getByText(/Favorite Pokémons/i);
    expect(favoritePokemons).toBeInTheDocument();

    userEvent.click(favoritePokemons);
    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });

  it('A aplicação é redirecionada para a página Not Found'
    + ' ao entrar em uma URL desconhecida', () => {
    const { history, getByText } = renderWithRouter(<App />);

    const path = '/urlInvalida';
    history.push(path);

    const pageNotFound = getByText(/Page requested not found/i);
    expect(pageNotFound).toBeInTheDocument();
  });
});
