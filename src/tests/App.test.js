import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';

describe('Bloco de testes para o componente App.js', () => {
  it('Mostra a Pokédex quando a rota é `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('Testa se no topo da aplicação contém um conjunto de links fixos', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const homeLink = getByText('Home');
    const aboultLink = getByText('About');
    const favoritePokemonLink = getByText('About');
    expect(homeLink).toBeInTheDocument();
    expect(aboultLink).toBeInTheDocument();
    expect(favoritePokemonLink).toBeInTheDocument();
  });

  it('Testa se a aplicação é redirecionada p/ pagina inicial, clicando em "Home"', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const homeLink = getByText('Home');
    fireEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });

  it('Testa se a aplicação é redirecionada p/ pagina about, clicando em "About"', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const aboutLink = getByText('About');
    fireEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });

  it('Testa se a aplicação é redirecionada, clicando em "Favorite Pokémons"', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const favoritesLink = getByText('Favorite Pokémons');
    fireEvent.click(favoritesLink);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('Testa notfound quando passado um link inexistente', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/dasdasd'] }>
        <App />
      </MemoryRouter>,
    );
    const notfoundTitle = getByText(/Page requested not found/i);
    expect(notfoundTitle).toBeInTheDocument();
  });
});
