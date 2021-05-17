import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('1. Teste o componente <App.js />', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);

    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('Test that the main page of Pokédex is rendered in the URL path /', () => {
    const { history } = renderWithRouter(<App />);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Test whether the top of the application contains a fixed set links', () => {
    const { getAllByRole } = renderWithRouter(<App />);

    const links = getAllByRole('link');

    expect(links[0].textContent).toBe('Home');
    expect(links[1].textContent).toBe('About');
    expect(links[2].textContent).toBe('Favorite Pokémons');
  });

  it('Test if the application is redirected to the home page, at the URL "/"', () => {
    const { getAllByRole, history } = renderWithRouter(<App />);

    const links = getAllByRole('link');

    userEvent.click(links[0]);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  it('Test if the application is redirected to the about, at the URL "/about"', () => {
    const { getAllByRole, history } = renderWithRouter(<App />);

    const links = getAllByRole('link');

    userEvent.click(links[1]);
    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  it('Test if application is redirected to the favorites', () => {
    const { getAllByRole, history } = renderWithRouter(<App />);

    const links = getAllByRole('link');

    userEvent.click(links[2]);
    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });
});
