import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('header contains the links Home, About, Favorite Pokémons', () => {
  const { getByText } = renderWithRouter(<App />);
  const home = getByText(/Home/);
  expect(home).toBeInTheDocument();

  const about = getByText(/About/);
  expect(about).toBeInTheDocument();

  const favoritePokémons = getByText(/Favorite Pokémons/);
  expect(favoritePokémons).toBeInTheDocument();
});

test('changes route by clicking the link home', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const home = getByText(/Home/);
  fireEvent.click(home);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('changes route by clicking the link about', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const about = getByText(/About/i);
  fireEvent.click(about);
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('changes route by clicking the link favorite pokémons', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const favorites = getByText(/Favorite Pokémons/i);
  fireEvent.click(favorites);
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('renders an unknown route', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/0');
  const notFound = getByText('Page requested not found');
  expect(notFound).toBeInTheDocument();
});
