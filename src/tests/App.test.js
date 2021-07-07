import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('verificando conjunto de links de navegação', () => {
  it('Verifica se renderiza uma leitura com o texto `Pokédex', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('Verifica se mostra o Pokédex quando a rota é `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('Verifica link pokemons favoritos', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favoritePokemon = getByText(/Favorite Pokémons/);
    expect(favoritePokemon).toBeInTheDocument();

    fireEvent.click(favoritePokemon);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('link home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homeLink = getByText(/Home/);
    expect(homeLink).toBeInTheDocument();

    fireEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Verifica link about', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const aboutLink = getByText(/About/);
    expect(aboutLink).toBeInTheDocument();

    fireEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Verifica se é redirecionado para Not Found ao acessar URL desconhecido', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/url-desconhecida');
    const textNotFound = getByText(/Page requested not found/);
    expect(textNotFound).toBeInTheDocument();
  });
});
