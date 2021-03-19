import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa a página inicial', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  it('tests if the first link has \'Home\' as its text', () => {
    const { getByRole } = renderWithRouter(<App />);
    const homeLink = getByRole('link', { name: /Home/ });
    expect(homeLink).toBeInTheDocument();
  });
  it('tests if the first link has \'About\' as its text', () => {
    const { getByRole } = renderWithRouter(<App />);
    const aboutLink = getByRole('link', { name: /About/ });
    expect(aboutLink).toBeInTheDocument();
  });
  it('tests if the first link has \'Favorite Pokémons\' as its text', () => {
    const { getByRole } = renderWithRouter(<App />);
    const favoritePokemonLink = getByRole('link', { name: /Favorite Pokémons/ });
    expect(favoritePokemonLink).toBeInTheDocument();
  });
  it('tests if click redirects page to Homepage', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    fireEvent.click(getByRole('link', { name: /Home/ }));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('tests if click redirects page to About', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    fireEvent.click(getByRole('link', { name: /About/ }));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  it('tests if click redirects page to Favorites', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    fireEvent.click(getByRole('link', { name: /Favorite Pokémons/ }));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  it('tests if another path redirects page to Not Found page', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina-que-nao-existe');
    const notFound = getByText(/Page requested not found/);
    expect(notFound).toBeInTheDocument();
  });
});
