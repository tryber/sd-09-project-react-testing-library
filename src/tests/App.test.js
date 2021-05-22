import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('teste do componente App.js', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('Conjunto fixo de links de navegação', () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const linksNav = getAllByRole('link');
    expect(linksNav[0].innerHTML).toBe('Home');
    expect(linksNav[1].innerHTML).toBe('About');
    expect(linksNav[2].innerHTML).toBe('Favorite Pokémons');
  });

  it('Funcionalidade do link Home', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const home = getByRole('link', { name: 'Home' });
    fireEvent.click(home);
    expect(history.location.pathname).toBe('/');
  });

  it('Funcionalidade do link About', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const about = getByRole('link', { name: 'About' });
    fireEvent.click(about);
    expect(history.location.pathname).toBe('/about');
  });

  it('Funcionalidade do link Favorite pokémons', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const favPoke = getByRole('link', { name: 'Favorite Pokémons' });
    fireEvent.click(favPoke);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('Url desconhecida, redirect para not found', () => {
    const { history, getByRole } = renderWithRouter(<App />);
    history.push('/notfound');
    const notFound = getByRole(
      'heading',
      { name: 'Page requested not found Crying emoji' },
    );
    expect(notFound).toBeInTheDocument();
  });
});
