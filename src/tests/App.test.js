import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('The main pokedex page should renderizes', () => {
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

  test('verify the renderized links order', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const links = getAllByRole('link');
    expect(links[0]).toHaveTextContent('Home');
    expect(links[1]).toHaveTextContent('About');
    expect(links[2]).toHaveTextContent('Favorite Pokémons');
  });

  test('verify user behavior over links', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const homeLink = getByText('Home');
    const aboutLink = getByText('About');
    const favPkmLink = getByText(/Favorite Pokémons/i);
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
    userEvent.click(homeLink);
    userEvent.click(favPkmLink);
    expect(history.location.pathname).toBe('/favorites');
    history.push('/notFoundPage');
    const notFoundPage = getByText(/Not Found/i);
    expect(notFoundPage).toBeInTheDocument();
  });
});
