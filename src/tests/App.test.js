import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from './helpers';
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

test('should have a nav with some links', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const homeLink = getByText('Home');
  expect(homeLink).toBeInTheDocument();

  const aboutLink = getByText('About');
  expect(aboutLink).toBeInTheDocument();

  const favoriteLink = getByText('Favorite Pokémons');
  expect(favoriteLink).toBeInTheDocument();
});

test('should navigate to each link in the nav', () => {
  const { getByText, getByRole, history } = renderWithRouter(<App />);
  let path;
  const aboutLink = getByText('About');
  fireEvent.click(aboutLink);
  path = history.location.pathname;
  expect(path).toBe('/about');

  const homeLink = getByText('Home');
  fireEvent.click(homeLink);
  path = history.location.pathname;
  expect(path).toBe('/');

  const favoriteLink = getByText('Favorite Pokémons');
  fireEvent.click(favoriteLink);
  path = history.location.pathname;
  expect(path).toBe('/favorites');

  history.push('/rota-que-nao-existe');
  const notFoundComponent = getByRole('heading', { level: 2 });
  expect(notFoundComponent).toHaveTextContent('Page requested not found');
});
