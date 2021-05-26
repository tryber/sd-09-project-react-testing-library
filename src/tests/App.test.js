import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('Default test by Trybe, modified to use renderWithRouter', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('shows the Pokédex when the route is `/`', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
});

describe('Test for component App.js', () => {
  it('should have  the links "Home", "About" and "Favorite Pokémons"', () => {
    const { getByText } = renderWithRouter(<App />);

    const homeLink = getByText(/Home/i);
    expect(homeLink).toBeInTheDocument();

    const aboutLink = getByText(/About/i);
    expect(aboutLink).toBeInTheDocument();

    const favoriteLink = getByText(/Favorite Pokémons/i);
    expect(favoriteLink).toBeInTheDocument();
  });

  it('should redirect to "/" when clicking the link Home', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/Home/i));
    const { pathname } = history.location;

    expect(pathname).toBe('/');
    expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
  });

  it('should redirct to "/about" when clicking the link About', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;

    expect(pathname).toBe('/about');
    expect(getByText(/About Pokédex/i)).toBeInTheDocument();
  });

  it('should redirect to "/favorites" when clicking the Favorite Pokémons link', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });

  it('should render a not found page when using an unknown URL', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/spiked-ear-pichu');

    expect(getByText(/Page requested not found/i)).toBeInTheDocument();
  });
});
