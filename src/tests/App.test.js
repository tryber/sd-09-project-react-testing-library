import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('Teste do componente App.js', () => {
  it('Teste se o componente Pokedex é renderizada na rota "/"', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    expect(screen.getByText(/Encountered pokémons/i)).toBeInTheDocument();
  });

  it('Teste se o topo da aplicação contém os links Home, About, Favorite', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveTextContent(/home/i);
    expect(links[1]).toHaveTextContent(/about/i);
    expect(links[2]).toHaveTextContent(/favorite pokémons/i);
  });

  it('Teste se a aplicação é redirecionada para "/" ao clicar em Home', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Teste se a aplicação é redirecionada para "/about" ao clicar em About', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/about/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Teste se a aplicação é redirecionada para "/favorites" ao clicar em Favorites',
    () => {
      const { history } = renderWithRouter(<App />);
      userEvent.click(screen.getByText(/favorite pokémons/i));
      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });

  it('Teste se a aplicação é redire. para pag. "Not Found" acessar uma URL inexistente',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/pagina-nao-existente/aqui');
      expect(screen.getByText(/Page requested not found/i)).toBeInTheDocument();
    });
});
