import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

test('check if it contains a fixed set of navigation links', () => {
  renderWithRouter(<App />);
  const nav = screen.getByRole('navigation');
  const number = 3;

  expect(nav).toBeInTheDocument();
  expect(nav.childElementCount).toBe(number);
  expect(nav.children[0].text).toBe('Home');
  expect(nav.children[1].text).toBe('About');
  expect(nav.children[2].text).toBe('Favorite Pokémons');
});

test('if the Application is redirected to the home page, when clicking on Home.', () => {
  renderWithRouter(<App />);
  const nav = screen.getByRole('navigation');
  const home = nav.children[0];

  expect(home.pathname).toBe('/');
  userEvent.click(home);
  const h2 = screen.getByRole('heading', {
    level: 2,
    name: /Encountered pokémons/,
  });
  expect(h2).toBeInTheDocument();
});

test('if the application is redirected to the About page, by clicking on About.', () => {
  renderWithRouter(<App />);
  const nav = screen.getByRole('navigation');
  const about = nav.children[1];

  expect(about.pathname).toBe('/about');
  userEvent.click(about);
  const h2 = screen.getByRole('heading', {
    level: 2,
    name: /About Pokédex/,
  });
  expect(h2).toBeInTheDocument();
});

test('if the application is redirected to the favorites page, by clicking on favorites.',
  () => {
    renderWithRouter(<App />);
    const nav = screen.getByRole('navigation');
    const favoritePokémons = nav.children[2];

    expect(favoritePokémons.pathname).toBe('/favorites');
    userEvent.click(favoritePokémons);
    const h2 = screen.getByRole('heading', {
      level: 2,
      name: /Favorite pokémons/,
    });
    expect(h2).toBeInTheDocument();
  });

test('if entering an unknown URL, it is redirected to Not Found.', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/not-found');

  const h2 = screen.getByRole('heading', {
    level: 2,
    name: /Page requested not found/,
  });
  expect(h2).toBeInTheDocument();

  const imageNotFound = screen.getByAltText(
    /Pikachu crying because the page requested was not found/,
  );

  expect(imageNotFound).toBeInTheDocument();
  expect(imageNotFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
