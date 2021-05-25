import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

const renderWithHistory = (component) => {
  const history = createMemoryHistory();

  return {
    ...render(<Router history={ history }>{ component }</Router>), history,
  };
};

const favoritePokemons = 'Favorite Pokémons';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('Testa o carregamento da página principal ao acessar o caminho da URL /', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const title = getByText('Encountered pokémons');
  expect(title).toBeInTheDocument();
});

test('Testa se o topo da aplicação possui um conjunto de links de navegação', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const homeLink = getByText('Home');
  expect(homeLink).toBeInTheDocument();

  const aboutLink = getByText('About');
  expect(aboutLink).toBeInTheDocument();

  const favoriteLink1 = getByText(favoritePokemons);
  expect(favoriteLink1).toBeInTheDocument();
});

test('Testa direcionamento para a URL / ao clicar no link Home', () => {
  const { getByText, history } = renderWithHistory(<App />);

  const homeLink = getByText('Home');
  fireEvent.click(homeLink);

  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('Testa direcionamento para a URL /about ao clicar no link About', () => {
  const { getByText, history } = renderWithHistory(<App />);

  const aboutLink = getByText('About');
  fireEvent.click(aboutLink);

  const { pathname } = history.location;
  expect(pathname).toBe('/about');

  const aboutTitle = getByText('About Pokédex');
  expect(aboutTitle).toBeInTheDocument();
});

test('Testa direcionamento para a URL /favorites ao clicar em Favorite Pokémons', () => {
  const { getByText, history } = renderWithHistory(<App />);

  const favoriteLink2 = getByText(favoritePokemons);
  expect(favoriteLink2).toHaveTextContent(favoritePokemons);

  fireEvent.click(favoriteLink2);

  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');

  const favoriteTitle = getByText(favoritePokemons);
  expect(favoriteTitle).toBeInTheDocument();
});

test('Testa direcionamento para página Not Found caso a URL seja desconhecida', () => {
  const { getByRole, history } = renderWithHistory(<App />);

  history.push('/xablau');

  const notFound = getByRole('heading', { level: 2 });
  expect(notFound).toBeInTheDocument();
  expect(notFound).toHaveTextContent('Page requested not found');
});
