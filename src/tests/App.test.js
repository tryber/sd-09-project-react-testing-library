import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test App component', () => {
  it('should render a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('should render main page if url is "/"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const pageTitle = getByText('Pokédex');
    expect(pageTitle).toBeInTheDocument();
    const url = history.location.pathname;
    expect(url).toBe('/');
  });

  it('should have three nav links', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  it('should render main page by clicking at Home link', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const homeLink = getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);
    const h2 = getByRole('heading', { level: 2 });
    expect(h2.textContent).toBe('Encountered pokémons');
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('redirect to About page when About link is clicked, and URL must be"/about"', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const aboutLink = getByRole('link', { name: 'About' });
    userEvent.click(aboutLink);
    const h2 = getByRole('heading', { level: 2 });
    expect(h2.textContent).toBe('About Pokédex');
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('redirect to Favorites Page and URL must be /favorites', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const favoriteLink = getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteLink);
    const h2 = getByRole('heading', { level: 2 });
    expect(h2.textContent).toBe(' Favorite pokémons ');
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('should render NotFound component if URL does not exist', () => {
    const { history, getByText } = renderWithRouter(<App />);
    history.push('/xablau');
    const { pathname } = history.location;
    expect(pathname).toBe('/xablau');
    const notFound = getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
