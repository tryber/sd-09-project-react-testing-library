import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('Testes do App', () => {
  test('shows the Pokédex when the route is `/`', () => {
    const { getByText } = renderWithRouter(<App />);
    const links = ['Home', 'About', 'Favorite Pokémons'];
    const numberOfLinks = 3;
    expect(getByText('Encountered pokémons')).toBeInTheDocument();

    const appLinks = document.querySelectorAll('.link');
    expect(appLinks.length).toBe(numberOfLinks);
    appLinks.forEach((_link, index) => expect(appLinks[index].innerHTML)
      .toBe(links[index]));
  });

  it('Verifica se o link home vai para /', () => {
    const { getByText, history } = renderWithRouter(<App />);
    userEvent.click(getByText(/Home/i));
    const { location: { pathname } } = history;
    history.push('/');
    expect(pathname).toBe('/');
  });

  it('Verifica se o link about vai para o /about', () => {
    const { getByText, history } = renderWithRouter(<App />);
    userEvent.click(getByText(/About/i));
    const { location: { pathname } } = history;
    history.push('/about');
    expect(pathname).toBe('/about');
  });

  it('Verifica se o link Favorite Pokémons vai para o /favorites', () => {
    const { getByText, history } = renderWithRouter(<App />);
    userEvent.click(getByText(/Favorite Pokémons/i));
    const { location: { pathname } } = history;
    history.push('/favorites');
    expect(pathname).toBe('/favorites');
  });

  it('Verifica se o vai para uma página não encontrada', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/sem-pagina');
    const notFound = getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
