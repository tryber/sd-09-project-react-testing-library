import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from './History';
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

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('shows the nav with 3 links: home, about and favorite pokemon', () => {
  const { getAllByRole } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  const navBar = getAllByRole('link');

  expect(navBar[0].textContent).toBe('Home');
  expect(navBar[1].textContent).toBe('About');
  expect(navBar[2].textContent).toBe('Favorite Pokémons');
});

test('redirect to `/` when click on `Home` link', () => {
  const { getByText, history } = renderWithRouter(<App />);

  fireEvent.click(getByText('Home'));
  const { pathname } = history.location;

  expect(pathname).toBe('/');
});

test('redirect to `/about` when click on `About` link', () => {
  const { getByText, history } = renderWithRouter(<App />);

  fireEvent.click(getByText('About'));
  const { pathname } = history.location;

  expect(pathname).toBe('/about');
});

test('redirect to `/favorites` when click on `Favorites Pokémons` link', () => {
  const { getByText, history } = renderWithRouter(<App />);

  fireEvent.click(getByText('Favorite Pokémons'));
  const { pathname } = history.location;

  expect(pathname).toBe('/favorites');
});
