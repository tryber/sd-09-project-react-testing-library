import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';

describe('testando quisito 1', () => {
  test('verifica se inicia no caminho de url em ` / `', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Verifica se existe o link `Home`', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText(/Home/);
    expect(home).toBeInTheDocument();
  });

  test('Verifica se existe o link `About`', () => {
    const { getByText } = renderWithRouter(<App />);
    const About = getByText(/About/);
    expect(About).toBeInTheDocument();
  });

  test('Verifica se existe o link `Favorite Pokémons`', () => {
    const { getByText } = renderWithRouter(<App />);
    const FavoritePokémons = getByText(/^Favorite Pokémons$/i);
    expect(FavoritePokémons).toBeInTheDocument();
  });

  test('Verifica se é redirecionada para a  URL `/` ao clicar no `Home`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Verifica se é redirecionada para a  URL `/About` ao clicar no `About`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Redireciona para URL `/favorites` ao clicar no `Pokémons Favoritados`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Redireciona para a `Not Found` ao entrar em uma URL desconhecida.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
