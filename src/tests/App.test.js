import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
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

test('O primeiro link deve possuir o texto Home', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  const home = getByText('Home');
  expect(home).toBeInTheDocument();
});

test('O segundo link deve possuir o texto About.', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/about'] }>
      <App />
    </MemoryRouter>,
  );
  const renderAbout = getByText('About');
  expect(renderAbout).toBeInTheDocument();
});

test('O terceiro link deve possuir o texto Favorite Pokémons.', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/favorites'] }>
      <App />
    </MemoryRouter>,
  );
  const favPokemon = getByText('Favorite Pokémons');
  expect(favPokemon).toBeInTheDocument();
});

test('Testa a aplicação é red. à página inicial, ao clicar no link Home.', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/Home/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/');
  const renderHome = getByText(/Home/);
  expect(renderHome).toBeInTheDocument();
});

test('Testa a aplicação é red. à página de About, ao clicar no link About.', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/About/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
  const renderAbout = getByText('About');
  expect(renderAbout).toBeInTheDocument();
});

test('Testa a aplicação é red. à página de Pok. Favo. ao clicar no link fav Pok.', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/Favorite Pokémons/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
  const renderFavPok = getByText('Favorite Pokémons');
  expect(renderFavPok).toBeInTheDocument();
});

test('Testa a aplicação é red. para a pág Not Found ao entrar em uma URL desc.', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/Page requested not found/');
  const naoEncontrado = getByText(/Page requested not found/i);
  expect(naoEncontrado).toBeInTheDocument();
});
