import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando o componente <App.js />', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);

    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('Testa se a pagina principal renderizada em /.', () => {
    const { history } = renderWithRouter(<App />);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Testa se no header do App possui links fixos de navegação.', () => {
    const { getByText } = renderWithRouter(<App />);

    const homeLink = getByText(/Home/i);
    expect(homeLink).toBeInTheDocument();

    const aboutLink = getByText(/About/i);
    expect(aboutLink).toBeInTheDocument();

    const favPokemonsLink = getByText(/Favorite Pokémons/i);
    expect(favPokemonsLink).toBeInTheDocument();
  });

  it(`Testa se App redireciona p/ Home,
   em "/" ao clicar no link Home em navegação.`, () => {
    const { getAllByRole, history } = renderWithRouter(<App />);

    const links = getAllByRole('link');

    userEvent.click(links[0]);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  it(`Testa se App redireciona p/ "About",
  em "/About" ao clicar no link "about" em navegação`,
  () => {
    const { getAllByRole, history } = renderWithRouter(<App />);

    const links = getAllByRole('link');

    userEvent.click(links[1]);
    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  it(`Testa se App redireciona p/ pág Pokémons Favoritados
    em /favorites, ao clicar no link Favorite,Pokémons em navegação`,
  () => {
    const { getAllByRole, history } = renderWithRouter(<App />);

    const links = getAllByRole('link');

    userEvent.click(links[2]);
    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });
});
