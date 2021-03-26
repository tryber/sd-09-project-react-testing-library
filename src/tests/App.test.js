import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('testing App component paths of the webpage', () => {
  it('Testing path on Home', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const { pathname } = history.location;
    const homeLink = getByText(/Home/i);
    expect(homeLink).toBeInTheDocument();
    expect(pathname).toBe('/');
  });

  it('renders `Pokédex` homepage', () => {
    const { getByText } = renderWithRouter(<App />);
    const titleApp = getByText(/Pokédex/i);
    expect(titleApp).toBeInTheDocument();
  });

  it('Testing about link from Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const aboutLink = getByText('About');
    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Testing FavoritePokemons link from Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const FavPokemonsLink = getByText(/Favorite Pokémons/i);
    userEvent.click(FavPokemonsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Testing NotFound link from Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/xx');
    const notFound = getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
