import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando componente App', () => {
  it('Testando se há o texto `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText('Pokédex');
    expect(heading).toBeInTheDocument();
  });

  it('Testa se a página Pokedéx é renderizada na rota `/`', () => {
    const { history } = renderWithRouter(<App />);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/');
  });
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    const { getByText } = renderWithRouter(<App />);
    const linkHome = getByText('Home');
    const linkAbout = getByText('About');
    const linkFavorite = getByText('Favorite Pokémons');

    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorite).toBeInTheDocument();
  });

  it('Testa os links de navegação "/"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkHome = getByText('Home');
    fireEvent.click(linkHome);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/');
  });

  it('Testa os links de navegação "/about"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkAbout = getByText('About');
    fireEvent.click(linkAbout);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/about');
  });

  it('Testa os links de navegação "/favorites"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkFavorites = getByText('Favorite Pokémons');
    fireEvent.click(linkFavorites);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/favorites');
  });

  it('Teste se a aplicação é redirecionada para a página Not Found', () => {
    const { history, getByText } = renderWithRouter(<App />);
    history.push('/pageNotFound');
    const pageNotFound = getByText('Page requested not found');
    expect(pageNotFound).toBeInTheDocument();
  });
});
