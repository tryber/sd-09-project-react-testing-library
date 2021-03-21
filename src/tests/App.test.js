import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('Testa o componente <App.js />', () => {
  it(`Teste se a página principal da Pokédex é renderizada
      ao carregar a aplicação no caminho de URL /.`, () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it(`Testa se o topo da aplicação contém um conjunto fixo
      de links de navegação.`, () => {
    const { getByText } = renderWithRouter(<App />);
    const linkHome = getByText(/Home/i);
    expect(linkHome).toBeInTheDocument();

    const linkAbout = getByText(/About/i);
    expect(linkAbout).toBeInTheDocument();

    const linkFavoritePokémons = getByText(/Favorite Pokémons/i);
    expect(linkFavoritePokémons).toBeInTheDocument();
  });

  it(`Testa se a aplicação é redirecionada para a página
      inicial, na URL /.`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it(`Testa se a aplicação é redirecionada para a página
      About, na URL /about.`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it(`Testa se a aplicação é redirecionada para a página
      Pokémons Favoritados, na URL /favorites.`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it(`Teste se a aplicação é redirecionada para a página Not Found
      ao entrar em uma URL desconhecida.`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/notFound');
    const { pathname } = history.location;
    expect(pathname).toBe('/notFound');

    const pageNotFound = getByText(/Page requested not found/i);
    expect(pageNotFound).toBeInTheDocument();
  });
});
