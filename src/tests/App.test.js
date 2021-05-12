import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testing App.js', () => {
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

  test('tests whether the top of the application has a set of links', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText(/Home/)).toBeInTheDocument();
    expect(getByText(/About/)).toBeInTheDocument();
    expect(getByText(/Favorite Pokémons/)).toBeInTheDocument();
  });

  test('tests the direction of the Home link', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('tests the direction of the About link', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('tests the direction of the Favorite Pokémons link', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('tests redirects to a page with no routes, if it does not exist', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/broken');
    const notFound = getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});
