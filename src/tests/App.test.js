import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('testing whether the route is "/"', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  expect(getByText('Encountered pokémons').toBeInTheDocument);
});

test('Testing fixed set of navigation links.', () => {
  const { getAllByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const link = getAllByRole('link');
  expect(link[0].textContent).toBe('Home');
  expect(link[1].textContent).toBe('About');
  expect(link[2].textContent).toBe('Favorite Pokémons');
});

describe('Testing route', () => {
  test('Testing Home', () => {
    const { history, getByText } = renderWithRouter(<App />);
    userEvent.click(getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Testing About', () => {
    const { history, getByText } = renderWithRouter(<App />);
    userEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Testing Favorites', () => {
    const { history, getByText } = renderWithRouter(<App />);
    userEvent.click(getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Testing 404', () => {
    const { history, getByText } = renderWithRouter(<App />);
    history.push('/qualquer coisa');
    const erro = getByText(/not found/);
    expect(erro).toBeInTheDocument();
  });
});
