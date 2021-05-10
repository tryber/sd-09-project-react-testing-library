import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import renderRouter from './renderRouter';
import App from '../App';

describe('Testing home page', () => {
  it('Renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  // 'verificar se o topo da aplicação possui links fixos'
  it('check if the top of the application has fixed links', () => {
    const { getByText } = render(
    // MemoryRouter leva a matriz de rotas iniciais como entrada
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    // usando expressão regular, não entendi bem o conceito mas estou aplicando conforme a aula.
    const checkHome = getByText(/home/i);
    const checkAbout = getByText(/about/i);
    const checkFavoritePoke = getByText(/Favorite Pokémons/i);
    expect(checkHome).toBeInTheDocument();
    expect(checkAbout).toBeInTheDocument();
    expect(checkFavoritePoke).toBeInTheDocument();
  });
  // Verifica redirecionamento da url /home
  it('Checks url redirect /home', () => {
    const { getByText, history } = renderRouter(<App />);
    const { pathname } = history.location;
    fireEvent.click(getByText(/Home/i));
    expect(pathname).toBe('/');
  });
  // Verifica redirecionamento da url /about
  it('Checks url redirect /about', () => {
    const { getByText, history } = renderRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  // Verifica redirecionamento da url /favorites
  it('Checks url redirect /favorites', () => {
    const { getByText, history } = renderRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  // Verifica o redirecionamento de url para "não encontrado"
  it('Checks url redirect for "not found"', () => {
    const { getByText, history } = renderRouter(<App />);
    history.push('/paginaNaoEncontrada/');
    const notFoundPage = getByText(/Page requested not found/i);
    expect(notFoundPage).toBeInTheDocument();
  });
});
