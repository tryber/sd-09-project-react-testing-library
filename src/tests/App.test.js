import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente App', () => {
  it('Teste se Pokédex é renderizada ao carregar o caminho de URL /', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const pokedexHeader = getByText(/Encountered pokémons/i);
    const { location } = history;

    expect(pokedexHeader).toBeInTheDocument();
    expect(location.pathname).toBe('/');
  });

  it('Teste se a aplicação contém um conjunto de links de navegação.', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const linksAvailable = getAllByRole('link');
    const linksLenght = 4;

    expect(linksAvailable.length).toBe(linksLenght);

    expect(linksAvailable[0]).toBeInTheDocument();
    expect(linksAvailable[0].innerHTML).toBe('Home');

    expect(linksAvailable[1]).toBeInTheDocument();
    expect(linksAvailable[1].innerHTML).toBe('About');

    expect(linksAvailable[2]).toBeInTheDocument();
    expect(linksAvailable[2].innerHTML).toBe('Favorite Pokémons');

    expect(linksAvailable[3]).toBeInTheDocument();
    expect(linksAvailable[3].innerHTML).toBe('More details');
  });

  it('Teste se o link Home redireciona para /', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homeLink = getByText('Home');

    fireEvent.click(homeLink);

    const { location } = history;

    expect(location.pathname).toBe('/');
  });

  it('Teste se o link About redireciona para /about', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const aboutLink = getByText('About');

    fireEvent.click(aboutLink);

    const { location } = history;

    expect(location.pathname).toBe('/about');
  });

  it('Teste se o link Favorite Pokémons redireciona para /favorites', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favoriteLinks = getByText('Favorite Pokémons');

    fireEvent.click(favoriteLinks);

    const { location } = history;

    expect(location.pathname).toBe('/favorites');
  });

  it('Teste se uma URL desconhecida redireciona para a página NotFound', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('urlivalida');

    const notFoundMessage = getByText(/not found/i);

    expect(notFoundMessage).toBeInTheDocument();
  });
});
