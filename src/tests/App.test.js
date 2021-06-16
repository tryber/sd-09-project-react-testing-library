import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('testa o componente App.js', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('testa se o topo da aplicação contém um conjunto fixo de links', () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const links = getAllByRole('link');
    expect(links[0].innerHTML).toBe('Home');
    expect(links[1].innerHTML).toBe('About');
    expect(links[2].innerHTML).toBe('Favorite Pokémons');
  });

  test('testa a funcionalidade do link Home', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const home = getByRole('link', { name: 'Home' });
    fireEvent.click(home);
    expect(history.location.pathname).toBe('/');
  });

  test('testa a funcionalidade do link About', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const about = getByRole('link', { name: 'About' });
    fireEvent.click(about);
    expect(history.location.pathname).toBe('/about');
  });

  test('testa a funcionalidade do link Favorite Pokémons', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const favPokemons = getByRole('link', { name: 'Favorite Pokémons' });
    fireEvent.click(favPokemons);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('testa se a aplicação é redirecionada para a página Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/anything');
    const notFound = getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
