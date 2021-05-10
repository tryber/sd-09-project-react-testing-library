import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testing App component', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('renders nav links', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    const homeLink = getByText('Home');
    const aboutLink = getByText('About');
    const favoritePokemonsLink = getByText('Favorite Pokémons');
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritePokemonsLink).toBeInTheDocument();
  });

  it('Redirects to / URL when Home link is clicked', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const homeLink = getByText('Home');
    userEvent.click(homeLink);
    history.push('/');

    expect(history.location.pathname).toBe('/');
  });

  it('Redirects to /about URL when About link is clicked', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const aboutLink = getByText('About');
    userEvent.click(aboutLink);
    history.push('/about');

    expect(history.location.pathname).toBe('/about');
  });

  it('Redirects to /favorites URL when favorite pokemon link is clicked', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const favoritePokemonsLink = getByText(/favorite pokémons/i);
    userEvent.click(favoritePokemonsLink);
    history.push('/favorites');

    expect(history.location.pathname).toBe('/favorites');
  });

  it('Redirects to not found page when URL is unknown', () => {
    const {
      getByRole, getByLabelText, getByAltText, history } = renderWithRouter(<App />);

    history.push('/Alakazam');

    expect(getByRole('heading', {
      name: /page requested not found/i,
    })).toBeInTheDocument();

    expect(getByLabelText('Crying emoji')).toBeInTheDocument();
    expect(getByAltText(/pikachu/i)).toBeInTheDocument();
  });
});
