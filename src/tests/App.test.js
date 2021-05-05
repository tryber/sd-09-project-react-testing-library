import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente <App.js />.', () => {
  it('Renderiza um cabecalho com o texto `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);

    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('Mostra a Pokédex quando o route for `/`', () => {
    const { getByText } = renderWithRouter(<App />);

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('Testa se App contem um conjunto de links de navegacao', () => {
    const { getByText } = renderWithRouter(<App />);

    expect(getByText(/Home/i)).toBeInTheDocument();
    expect(getByText(/About/i)).toBeInTheDocument();
    expect(getByText(/Favorite Pokémons/i)).toBeInTheDocument();
  });

  it('Testa se o link "Home" redireciona para a página inicial em "/".', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/Home/i));

    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  it('Testa se o link "About" redireciona para "/about".', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/About/i));

    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  it('Testa se o link "Pokémons Favoritados" redireciona para "/favorites".', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/Favorite Pokémons/i));

    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });

  it('Testa se a página "NotFound" é exibida ao entrar em uma URL desconhecida', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/xablau');

    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
