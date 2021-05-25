import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWhithRouter from '../components/RenderWithRouter';

test('renderiza uma heading com o texto `Pokédex`', () => {
  renderWhithRouter(<App />);
  const heading = screen.getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('Testa se a página renderizada a Home ao carregar a aplicação no caminho de URL /',
  () => {
    const { history } = renderWhithRouter(<App />);
    const { location } = history;
    const { pathname } = location;
    expect(pathname).toBe('/');
  });

test('Testa se o topo da aplicação contém um conjunto fixo de links de navegação.',
  () => {
    renderWhithRouter(<App />);
    const home = screen.getByText('Home');
    const about = screen.getByText('About');
    const favoritePokemons = screen.getByText('Favorite Pokémons');
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritePokemons).toBeInTheDocument();
  });

test('Testa se a aplicação é redirecionada para Home, ao clicar em Home.',
  () => {
    const { history } = renderWhithRouter(<App />);
    const home = screen.getByText('Home');
    fireEvent.click(home);
    const { location } = history;
    const { pathname } = location;
    expect(pathname).toBe('/');
  });

test('Testa se a aplicação é redirecionada para About, ao clicar em About.',
  () => {
    const { history } = renderWhithRouter(<App />);
    const about = screen.getByText('About');
    fireEvent.click(about);
    const { location } = history;
    const { pathname } = location;
    expect(pathname).toBe('/about');
  });
// tslint:disable-next-line:max-line-length
test('Testa se é redirecionada para Pokémons Favoritados(PF), quando em PF.',
  () => {
    const { history } = renderWhithRouter(<App />);
    const favoritePokemons = screen.getByText('Favorite Pokémons');
    fireEvent.click(favoritePokemons);
    const { location } = history;
    const { pathname } = location;
    expect(pathname).toBe('/favorites');
  });

test('Testa se é redirecionada para Not Found ao entrar em uma URL desconhecida.',
  () => {
    const { history, getByText } = renderWhithRouter(<App />);
    history.push('/noFound');

    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
