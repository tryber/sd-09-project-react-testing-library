import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Testa o componente App.js', () => {
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

  it('Topo da aplicação contem um conjunto fixo de links de navegação', () => {
    const { getAllByRole } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const links = getAllByRole('link');
    expect(links[0].innerHTML).toBe('Home');
    expect(links[1].innerHTML).toBe('About');
    expect(links[2].innerHTML).toBe('Favorite Pokémons');
  });

  it('Test if is redirected to the home page,when clicked on the home link', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const button = getByRole('link', { name: 'Home' });
    fireEvent.click(button);
    expect(history.location.pathname).toBe('/');
  });

  it('Test if is redirected to the about page, when clicked on the about link', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const button = getByRole('link', { name: 'About' });
    fireEvent.click(button);
    expect(history.location.pathname).toBe('/about');
  });

  it('Is redirected to the favorite page, when clicked on the favorite link', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const button = getByRole('link', { name: 'Favorite Pokémons' });
    fireEvent.click(button);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('Is redirected to the not found page, when URL is not found', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/aniPage');
    const h2 = getByRole(
      'heading',
      { level: 2, name: 'Page requested not found Crying emoji' },
    );
    expect(h2).toBeInTheDocument();
  });
});
