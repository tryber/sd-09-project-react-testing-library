import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando o componente <App />', () => {
  it('Verifica se a página inicial é renderizada com o caminho "/"', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  it('Verifica se o menu principal contém os links', () => {
    const { getByText } = renderWithRouter(<App />);

    const home = getByText(/home/i);
    const about = getByText(/about/i);
    const favoritesPokemons = getByText(/favorite\spokémons/i);

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritesPokemons).toBeInTheDocument();
  });

  it('Verifica se acessamos a página "Home" ao clicar no link', () => {
    const { getByText, getByRole, history } = renderWithRouter(<App />);

    userEvent.click(getByText(/home/i));

    const { pathname } = history.location;
    const textHeading = getByRole('heading', { level: 2 });

    expect(pathname).toBe('/');
    expect(textHeading).toBeInTheDocument();
    expect(textHeading).toHaveTextContent('Encountered pokémons');
  });

  it('Verifica se acessamos a página "About" ao clicar no link', () => {
    const { getByText, getByRole, history } = renderWithRouter(<App />);

    userEvent.click(getByText(/about/i));

    const { pathname } = history.location;
    const textHeading = getByRole('heading', { level: 2 });

    expect(pathname).toBe('/about');
    expect(textHeading).toBeInTheDocument();
    expect(textHeading).toHaveTextContent('About Pokédex');
  });

  it('Verifica se acessamos a página "Pokémons Favoritados" ao clicar no link', () => {
    const { getByText, getByRole, history } = renderWithRouter(<App />);

    userEvent.click(getByText(/Favorite\sPokémons/i));

    const { pathname } = history.location;
    const textHeading = getByRole('heading', { level: 2 });

    expect(pathname).toBe('/favorites');
    expect(textHeading).toBeInTheDocument();
    expect(textHeading).toHaveTextContent('Favorite pokémons');
  });

  it('Verifica se acessamos a página "Not Found" ao não encontrar uma página', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    history.push('/pikachu');

    const textHeading = getByRole('heading', { level: 2 });

    expect(textHeading).toBeInTheDocument();
    expect(textHeading).toHaveTextContent('Page requested not found');
  });
});
