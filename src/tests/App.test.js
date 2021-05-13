import { fireEvent } from '@testing-library/react';
import React from 'react';
// import { render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('requisito 1', () => {
  it('verifica se renderiza o texto Pokedex', () => {
    const { getByText } = renderWithRouter(<App />);

    const heading = getByText('Pokédex');
    expect(heading).toBeInTheDocument();
  });

  it('testa se a página principal Pokedex é renderizada na rota /', () => {
    const { history } = renderWithRouter(<App />);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/');
  });

  it('Teste se o topo da aplicação contém um conjunto de links de navegação.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homeLink = getByText('Home');
    expect(homeLink).toBeInTheDocument();

    fireEvent.click(homeLink);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/');

    const aboutLink = getByText('About');
    expect(aboutLink).toBeInTheDocument();
    fireEvent.click(aboutLink);
    const pathAbout = history.location.pathname;
    expect(pathAbout).toBe('/about');

    history.push('/');

    const favPok = getByText('Favorite Pokémons');
    expect(favPok).toBeInTheDocument();
    fireEvent.click(favPok);
    const favPokPath = history.location.pathname;
    expect(favPokPath).toBe('/favorites');
  });

  it('testa uma rota não existente e a renderização do Not Found', () => {
    const { history, getByText } = renderWithRouter(<App />);
    history.push('/pagina-nao-exite/');
    const noMatch = getByText('Page requested not found');
    expect(noMatch).toBeInTheDocument();
  });
});
