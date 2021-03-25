import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('Verify if the aplication has links', () => {
  const { getByText, history } = renderWithRouter(<App />);

  const homeLink = getByText(/Home/i);
  expect(homeLink).toBeInTheDocument();

  userEvent.click(homeLink);

  const { pathname: homepath } = history.location;
  expect(homepath).toBe('/');

  history.push('/');

  const abouLink = getByText(/About/i);
  expect(abouLink).toBeInTheDocument();

  userEvent.click(abouLink);
  const { pathname: aboutpath } = history.location;
  expect(aboutpath).toBe('/about');

  history.push('/');

  const favoriteLink = getByText(/Favorite Pokémons/i);
  expect(favoriteLink).toBeInTheDocument();

  userEvent.click(favoriteLink);
  const { pathname: favoritepath } = history.location;
  expect(favoritepath).toBe('/favorites');
});

test('Test if the application is redirected to the Not Found page', () => {
  const { history, getByText } = renderWithRouter(<App />);

  const route = '/naotemnada';
  history.push(route);

  const pageNotFound = getByText(/Page requested not found/i);
  expect(pageNotFound).toBeInTheDocument();
});
