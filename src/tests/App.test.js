import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testando <App />', () => {
  test('Verifica se App é renderizada no caminho "/" ', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });
  test('Verica se o Link "Home" é renderizado e se ele faz link à url "/"', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const homeLink = getByText(/Home/i);
    expect(homeLink).toBeInTheDocument();

    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  test('Verica se o Link "About" é renderizado e se ele faz link à url "/about"', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const aboutLink = getByText(/About/i);
    expect(aboutLink).toBeInTheDocument();

    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  test('Verica se o Link "Favorite" é renderizado e se ele faz link à url "/favorites"',
    () => {
      const { history, getByText } = renderWithRouter(<App />);
      const favoriteLink = getByText(/Favorite Pokémons/i);
      expect(favoriteLink).toBeInTheDocument();

      userEvent.click(favoriteLink);
      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });
  test('Renderiza componente Not Found ao entrar em uma url desconhecida', () => {
    const { history, getByText } = renderWithRouter(<App />);
    history.push('/asdfghj');

    expect(getByText(/Page requested not found/i));
  });
});
