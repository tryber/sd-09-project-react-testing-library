import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 01', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('Pokédex é renderizada ao carregar a aplicação no caminho de URL /.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const home = getByText('Home');
    expect(home).toBeInTheDocument();

    const about = getByText('About');
    expect(about).toBeInTheDocument();

    const favPoke = getByText('Favorite Pokémons');
    expect(favPoke).toBeInTheDocument();
  });

  test('Entra na pagina Home', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText('Home');
    fireEvent.click(home);
    const homePage = getByText('Encountered pokémons');
    expect(homePage).toBeInTheDocument();
  });

  test('Entra na pagina About', () => {
    const { getByText } = renderWithRouter(<App />);
    const about = getByText('About');
    fireEvent.click(about);
    const aboutPage = getByText('About Pokédex');
    expect(aboutPage).toBeInTheDocument();
  });

  test('Entra na pagina Favorite', () => {
    const { getByText } = renderWithRouter(<App />);
    const favPoke = getByText('Favorite Pokémons');
    fireEvent.click(favPoke);
    const favPokePage = getByText('Favorite pokémons');
    expect(favPokePage).toBeInTheDocument();
  });

  test('Entra na pagina NotFound', () => {
    const { history, getByText } = renderWithRouter(<App />);
    history.push('/404');
    const notFound = getByText('Page requested not found');

    expect(notFound).toBeInTheDocument();
  });
});
