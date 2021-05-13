import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

describe('Testando a aplicação App.js', () => {
  test('renders a reading with the text `Pokédex', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('A aplicação é renderizada pelo caminho da URL /.', () => {
    const { history, getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('Home'));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('A aplicação deve possuir os links de Home, About e Favorite Pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Home')).toBeDefined();
    expect(getByText('About')).toBeDefined();
    expect(getByText('Favorite Pokémons')).toBeDefined();
  });

  test('A aplicação deve ser redirecionada para o About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText('Home'));
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  test('A aplicação deve ser redirecionada para o Favorite Pokémons', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText('Favorite Pokémons'));
    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });

  test('A aplicação deve ser redirecionada para o Not Found', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/page/not-found/');
    const page = getByRole('heading', {
      level: 2,
      name: /Page requested not found Crying emoji/i,
    });
    expect(page).toBeInTheDocument();
  });
});
