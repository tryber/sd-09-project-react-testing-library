import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('Verifica se o heading tem o texto Pokédex', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});
describe('Componente App.js', () => {
  it('testa se a página principal carrega com a url /', () => {
    // acessa o elemento
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    // faz o teste
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('testa se os nomes dos links são home, about e favorite pokémons', () => {
    // acessa o elemento
    renderWithRouter(<App />);
    const homeLink = screen.getByText(/Home/i);
    const aboutLink = screen.getByText(/About/i);
    const favoriteLink = screen.getByText(/Favorite/i);

    // faz o teste
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });

  it('testa se o app vai para a url / ao clicar no home', () => {
    // Acessa o elemento
    const { history } = renderWithRouter(<App />);
    const homePage = screen.getByText('Home');
    userEvent.click(homePage);

    // Faz teste
    const pathName = history.location.pathname;
    expect(pathName).toBe(pathName);
  });

  it('testa se o app vai para a url /about ao clicar no about', () => {
    // acessa o elemento
    const { history } = renderWithRouter(<App />);
    const aboutPage = screen.getByText('About');
    userEvent.click(aboutPage);

    // faz o teste
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('testa se o app vai para /favorites ao clicar no link favorites pokémons', () => {
    // acessa o elemento
    const { getByText, history } = renderWithRouter(<App />);
    const favoritesPage = getByText('Favorite Pokémons');
    userEvent.click(favoritesPage);

    // faz o teste
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('testa se a app vai para a página not found ao entrar em uma url que não conhece',
    () => {
    // acessa o elemento
      const { history } = renderWithRouter(<App />);
      history.push('/unknownpath');
      const noFoundtMessage = screen.getByText(/Page requested/);

      // faz o teste
      expect(noFoundtMessage).toBeInTheDocument();
      // Consultei o repositório da colega Sabrina Alves
    });
});
