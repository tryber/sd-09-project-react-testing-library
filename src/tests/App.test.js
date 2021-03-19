import React from 'react';
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o component App', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);

    const heading = getByText(/Pokédex/i);
    const subtitle = getByText(/Encountered pokémons/i);
    expect(heading).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
  });

  test('Testa se o topo da aplicação contém um conjunto fixode links de navegação',
    () => {
      const { getByText } = renderWithRouter(<App />);

      const home = getByText(/Home/i);
      expect(home).toBeInTheDocument();
      const about = getByText(/About/i);
      expect(about).toBeInTheDocument();
      const favoritePokemons = getByText(/Favorite Pokémons/i);
      expect(favoritePokemons).toBeInTheDocument();
    });

  test('Testa se a aplicação é redirecionada para a página inicial', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const home = getByText(/Home/i);
    const { location: { pathname } } = history;
    userEvent.click(home);
    expect(pathname).toBe('/');
  });

  test('Testa se a aplicação é redirecionada para a página de About', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const about = getByText('About');
    expect(about).toBeInTheDocument();
    userEvent.click(about);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  test('Testa se a aplicação é redirecionada para a página de Favoritados', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const favoritePokemons = getByText(/Favorite Pokémons/i);
    fireEvent.click(favoritePokemons);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });

  test('Testa se a aplicação é redirecionada para a página Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/link-que-nao-exite');
    const notFound = getByText(/Not Found/i);
    expect(notFound).toBeInTheDocument();
  });
});
