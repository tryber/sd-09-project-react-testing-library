import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<App />);
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByRole } = renderWithRouter(<App />);
  const heading = getByRole('heading', { level: 1, name: 'Pokédex' });
  expect(heading).toBeInTheDocument();
});

test('has nav links', () => {
  const { getAllByRole } = renderWithRouter(<App />);
  const links = getAllByRole('link');
  expect(links[0].textContent).toBe('Home');
  expect(links[1].textContent).toBe('About');
  expect(links[2].textContent).toBe('Favorite Pokémons');
});

test('is redirected to `Home` at `/`', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText('Home'));
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('is redirected to `About` at `/about`', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText('About'));
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('is redirected to `Favorite Pokémons` at `/favorites`', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText('Favorite Pokémons'));
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('is redirected to `Not Found` at `unknown path`', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/unknown-path');
  const noMatch = getByText('Page requested not found');
  expect(noMatch).toBeInTheDocument();
});
