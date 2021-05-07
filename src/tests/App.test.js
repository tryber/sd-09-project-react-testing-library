import React from 'react';

import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';

import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<App />);
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});
test('shows the Pokédex when the route is `/`', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});
test('there are 3 nav links at the Pokédex', () => {
  const { getByRole } = renderWithRouter(<App />);
  expect(getByRole('link', { name: 'Home' })).not.toBeNull();
  expect(getByRole('link', { name: 'About' })).not.toBeNull();
  expect(getByRole('link', { name: 'Favorite Pokémons' })).not.toBeNull();
});
test('goes to `/` in the pathname when click Home', () => {
  const { getByRole, history: { location: { pathname } } } = renderWithRouter(<App />);
  const homeLink = getByRole('link', { name: 'Home' });
  fireEvent.click(homeLink);
  expect(pathname).toBe('/');
});
test('goes to `/about` in the pathname when click About', () => {
  const { getByRole, history } = renderWithRouter(<App />);
  const aboutLink = getByRole('link', { name: 'About' });
  fireEvent.click(aboutLink);
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});
test('goes to `/favorites` in the pathname when click Favorite Pokémons', () => {
  const { getByRole, history } = renderWithRouter(<App />);
  const favoriteLink = getByRole('link', { name: 'Favorite Pokémons' });
  fireEvent.click(favoriteLink);
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});
test('goes to Not Found page when unknown pathname have been navigate for', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/not-found-test-page');
  expect(getByText('Page requested not found')).toBeDefined();
});
