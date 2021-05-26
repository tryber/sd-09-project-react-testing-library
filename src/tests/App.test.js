import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Testing <App.js />', () => {
  it('Should render a header with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const header = getByText(/Pokédex/i);
    expect(header).toBeInTheDocument();
  });

  it('Should render and redirect correctly Home navigation link', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText(/Home/i);
    expect(home).toBeInTheDocument();
    userEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Should render and redirect correctly About navigation link', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const about = getByText(/About/i);
    expect(about).toBeInTheDocument();
    userEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Should render and redirect correctly Favorite Pokémons navigation link', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favoritePokemons = getByText(/Favorite Pokémons/i);
    expect(favoritePokemons).toBeInTheDocument();
    userEvent.click(favoritePokemons);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Should render a `Not Found` page when landing on an unkown URL', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/unknown-url');
    const notFound = getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
