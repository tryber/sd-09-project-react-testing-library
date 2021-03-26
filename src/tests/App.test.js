import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
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

test('renders links to Home, About and Favorites components', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const linkToHome = getByText('Home');
  expect(linkToHome).toBeInTheDocument();
  const linkToAbout = getByText('About');
  expect(linkToAbout).toBeInTheDocument();
  const linkToFavorites = getByText('Favorite Pokémons');
  expect(linkToFavorites).toBeInTheDocument();
});

test('renders main page through URL `/`', () => {
  const { history: { location: { pathname } } } = renderWithRouter(<App />);
  expect(pathname).toBe('/');
});

test('renders about page through URL `/about`', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/About/i));
  const { location: { pathname } } = history;
  // const pathname = pathname;
  expect(pathname).toBe('/about');
});

test('renders about page through URL `/favorites`', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/Favorite Pokémons/i));
  const { location: { pathname } } = history;
  // const pathname = pathname;
  expect(pathname).toBe('/favorites');
});

// test('renders a link to About component', () => {
//   // const { getByText } = renderWithRouter(<App />);
//   // const about = getByText(/About/i);
//   renderWithRouter(<App />);
//   const about = screen.getByText(/About/i);
//   expect(about).toBeInTheDocument();
// });
// npx stryker run ./stryker/PokemonDetails.conf.json
// npx stryker run ./stryker/App.conf.json
