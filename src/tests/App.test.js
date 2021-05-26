import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('test App.js component', () => {
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

  it('have 3 navigation links on top of the page', () => {
    const { getByRole } = renderWithRouter(<App />);
    const home = getByRole('link', { name: 'Home' });
    const about = getByRole('link', { name: 'About' });
    const fav = getByRole('link', { name: 'Favorite Pokémons' });

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(fav).toBeInTheDocument();
  });

  it('redirect to `/` if Home link is clicked', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const home = getByRole('link', { name: 'Home' });

    fireEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('redirect to `/about` if About link is clicked', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const about = getByRole('link', { name: 'About' });

    fireEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('redirect to `/favorites` if Pokémons Favoritados link is clicked', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const favorites = getByRole('link', { name: 'Favorite Pokémons' });

    fireEvent.click(favorites);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('redirect to Not Found if unknown URL is inserted', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/notfound');

    const notFound = getByRole(
      'heading',
      { name: 'Page requested not found Crying emoji' },
    );
    expect(notFound).toBeInTheDocument();
  });
});
