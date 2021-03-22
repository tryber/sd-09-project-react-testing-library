import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
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

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação.',
  () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText(/home/i)).toBeInTheDocument();
    expect(getByText(/about/i)).toBeInTheDocument();
    expect(getByText(/favorite pokémons/i)).toBeInTheDocument();
  });

test('Teste se ao clicar no link home a pagina renderizada é do link home', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/home/i));
  const pathName = history.location.pathname;
  expect(pathName).toBe('/');
  expect(getByText(/encountered pokémons/i)).toBeInTheDocument();
});

test('teste se ao clicar no link about a pagina renderizada é do link About', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/about/i));
  const pathName = history.location.pathname;
  expect(pathName).toBe('/about');
  expect(getByText(/about pokédex/i)).toBeInTheDocument();
});

test(
  'teste se ao clicar no link Favorite Pókemons a pagina renderizada é do link correto',
  () => {
    const { getByText, getByRole, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/favorite pokémons/i));
    const pathName = history.location.pathname;
    expect(pathName).toBe('/favorites');
    expect(getByRole('heading', {
      level: 2,
      name: /favorite pokémons/i,
    })).toBeInTheDocument();
  },
);

test('Teste se caso a url digitada não exista, redirecione para Page Not Found', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/asdasd');
  expect(getByText(/page requested not found/i)).toBeInTheDocument();
});
