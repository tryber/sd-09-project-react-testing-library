import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Requisito 01 - App.js', () => {
  it('testa se é renderizado o texto `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);

    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('testa se a Home da Pokédex é renderizada no caminho da URL `/`', () => {
    const { history } = renderWithRouter(<App />);
    const { location } = history;
    const { pathname } = location;
    expect(pathname).toBe('/');
  });

  it('testa os menus', () => {
    const { history, getByText } = renderWithRouter(<App />);

    const aboutLink = getByText(/About/i);
    expect(aboutLink).toBeInTheDocument();

    userEvent.click(aboutLink);
    const { pathname: aboutPath } = history.location;
    expect(aboutPath).toBe('/about');

    history.push('/');

    const favoriteLink = getByText(/Favorite Pokémons/i);
    expect(favoriteLink).toBeInTheDocument();

    userEvent.click(favoriteLink);
    const { pathname: favoritePath } = history.location;
    expect(favoritePath).toBe('/favorites');

    history.push('/');

    const homeLink = getByText(/Home/i);
    expect(homeLink).toBeInTheDocument();

    userEvent.click(homeLink);
    const { pathname: homePath } = history.location;
    expect(homePath).toBe('/');
  });

  test('testa quando a página não é encontrada', () => {
    const { history, getByText } = renderWithRouter(<App />);

    const route = '/xablau';
    history.push(route);

    const pageNotFound = getByText(/Page requested not found/i);
    expect(pageNotFound).toBeInTheDocument();
  });
});
