import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('nav links', () => {
  const { getByText } = renderWithRouter(<App />);
  const home = getByText('Home');
  const about = getByText('About');
  const fav = getByText('Favorite Pokémons');
  expect(home).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(fav).toBeInTheDocument();
});

test('home link click', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const home = getByText('Home');
  fireEvent.click(home);
  expect(history.location.pathname).toBe('/');
});

test('about link click', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const about = getByText('About');
  fireEvent.click(about);
  expect(history.location.pathname).toBe('/about');
});

test('fav link click', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const fav = getByText('Favorite Pokémons');
  fireEvent.click(fav);
  expect(history.location.pathname).toBe('/favorites');
});

test('wrong url', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/test');
  const notFound = getByText('Page requested not found');
  expect(notFound).toBeInTheDocument();
});
