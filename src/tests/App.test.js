import React from 'react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('testes do componente App.js', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test(
    'Página principal da Pokédex é renderizada ao carregar a aplicação na URL /',
    () => {
      const { getByText } = render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );
      expect(getByText(/Encountered/)).toBeInTheDocument(); // used regex
    },
  );

  test('Topo da aplicação deve conter links Home, About e Favorite Pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const homeLink = getByRole('link', { name: 'Home' });
    const aboutLink = getByRole('link', { name: 'About' });
    const favoriteLink = getByRole('link', { name: 'Favorite Pokémons' });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });

  test(
    'Deve renderizar a URL / com evento onCLick no link Home',
    () => {
      const { getByText, history } = renderWithRouter(<App />);
      const homeRouteTest = getByText(/Home/i);
      userEvent.click(homeRouteTest);
      expect(history.location.pathname).toBe('/');
    },
  );

  test(
    'Deve renderizar a URL /about com evento onCLick no link About',
    () => {
      const { getByText, history } = renderWithRouter(<App />);
      const aboutRouteTest = getByText(/About/i);
      userEvent.click(aboutRouteTest);
      expect(history.location.pathname).toBe('/about');
    },
  );

  test(
    'Deve renderizar a URL /favorites onCLick Favorite Pokémons',
    () => {
      const { getByText, history } = renderWithRouter(<App />);
      const favoriteRouteTest = getByText(/Favorite/i);
      userEvent.click(favoriteRouteTest);
      expect(history.location.pathname).toBe('/favorites');
    },
  );

  test(
    'Deve renderizar a URL /notFound se for uma URL desconhecida',
    () => {
      const { getByText, history } = renderWithRouter(<App />);
      history.push('/notFound');
      // add url notFound to history
      const notFound = getByText(/Not Found/i);
      expect(notFound).toBeInTheDocument();
    },
  );
});
