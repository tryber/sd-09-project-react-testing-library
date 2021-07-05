import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Test \'App.js\' Component - Requirement 02', () => {
  it('Starts rendering in path `/`', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('The application has \'Home\', \'About\' and \'Favorite Pokémons\' Links',
    () => {
      const { getByText } = renderWithRouter(<App />);
      const home = getByText(/Home/i);
      expect(home).toBeInTheDocument();
      const about = getByText(/About/i);
      expect(about).toBeInTheDocument();
      const favoritePokemons = getByText(/Favorite Pokémons/i);
      expect(favoritePokemons).toBeInTheDocument();
    });
  it('\'Home\' link redirects to `/` path', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('\'About\' link redirects to `/about` path', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  it('\'Favorite Pokémons\' link redirects to `/favorites` path', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  it('Application is redirected to \'Not Found\' when receives a inexistent link',
    () => {
      const { history, getByText } = renderWithRouter(<App />);
      history.push('/not-a-path');
      const notFound = getByText(/Page requested not found/i);
      expect(notFound).toBeInTheDocument();
    });
});
