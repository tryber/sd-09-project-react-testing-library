import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente App.js', () => {
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

  test('the top of the application contains a fixed set of navigation links', () => {
    const { getByRole } = renderWithRouter(<App />);
    expect(getByRole('link', { name: /Home/i })).toBeInTheDocument();
    expect(getByRole('link', { name: /About/i })).toBeInTheDocument();
    expect(getByRole('link', { name: /Favorite Pokémons/i })).toBeInTheDocument();
  });

  test('the Home link redirects to the `/` URL', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    const homeLink = getByRole('link', { name: /Home/i });
    userEvent.click(homeLink);
    expect(pathname).toBe('/');
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('the About link redirects to the `/about` URL', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);
    const aboutLink = getByRole('link', { name: /About/i });
    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    expect(getByText('About Pokédex')).toBeInTheDocument();
  });

  test('the Favorite Pokémons link redirects to the `/favorites` URL', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);
    const favLink = getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    expect(getByText('Favorite pokémons')).toBeInTheDocument();
  });

  test('an unknown URL redirects to the Not Found page', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    expect(getByText(/Page requested not found/i)).toBeInTheDocument();
  });
});
