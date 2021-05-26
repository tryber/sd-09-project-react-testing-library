import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

describe('1. Test the component <APP />', () => {
  it('Should renders a reading with the text `Pokédex`.', () => {
    const { getByRole } = renderWithRouter(<App />);
    const pokedexName = getByRole('heading', {
      name: 'Pokédex',
      level: 1,
    });

    expect(pokedexName).toBeInTheDocument();
  });

  it('Should have link: Home, About and Favorite Pokémons.', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const links = getAllByRole('link');

    expect(links[0].textContent).toBe('Home');
    expect(links[1].textContent).toBe('About');
    expect(links[2].textContent).toBe('Favorite Pokémons');
  });

  it('Should click in Home, render URL /.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText('Home');

    userEvent.click(home);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Should click in About, render URL /about.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const about = getByText('About');

    userEvent.click(about);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Should click in Favorite Pokémons, render URL /favorites.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favoritPokemon = getByText('Favorite Pokémons');

    userEvent.click(favoritPokemon);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Should redirect to not found, when search url invalid.', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    history.push('/xablau');

    const notFoudText = getByRole('heading', {
      name: /not found/,
      level: 2,
    });

    expect(notFoudText).toBeInTheDocument();
  });
});
