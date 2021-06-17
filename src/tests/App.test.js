import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../helpers/renderWithRouter';
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
    const arrayOfLinks = getAllByRole('link');
    const numberOfExpectedLinks = 4;

    expect(arrayOfLinks.length).toBe(numberOfExpectedLinks);

    expect(arrayOfLinks[0]).toBeInTheDocument();
    expect(arrayOfLinks[0].innerHTML).toBe('Home');

    expect(arrayOfLinks[1]).toBeInTheDocument();
    expect(arrayOfLinks[1].innerHTML).toBe('About');

    expect(arrayOfLinks[2]).toBeInTheDocument();
    expect(arrayOfLinks[2].innerHTML).toBe('Favorite Pokémons');

    expect(arrayOfLinks[3]).toBeInTheDocument();
    expect(arrayOfLinks[3].innerHTML).toBe('More details');
  });

  it('Teste se o link Home redireciona para /', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkToHome = getByText('Home');

    fireEvent.click(linkToHome);

    const { location } = history;

    expect(location.pathname).toBe('/');
  });

  it('Teste se o link About redireciona para /about', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkToAbout = getByText('About');

    fireEvent.click(linkToAbout);

    const { location } = history;

    expect(location.pathname).toBe('/about');
  });

  it('Teste se o link Favorite Pokémons redireciona para /favorites', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkToFavorites = getByText('Favorite Pokémons');

    fireEvent.click(linkToFavorites);

    const { location } = history;

    expect(location.pathname).toBe('/favorites');
  });

  it('Teste se uma URL desconhecida redireciona para a página NotFound', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('urlivalida');

    const notFoundText = getByText(/not found/i);

    expect(notFoundText).toBeInTheDocument();
  });
});
