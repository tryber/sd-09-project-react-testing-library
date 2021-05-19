import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testing the homePage "/"', () => {
  it('should render a heading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('should shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
});

describe('testing the navigation bar', () => {
  it('shows the menu', () => {
    const { getByText } = renderWithRouter(<App />);
    const homeLink = getByText('Home');
    const aboutLink = getByText('About');
    const favoriteLink = getByText('Favorite Pokémons');

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });

  it('Should redirect to "/", by clicking on the home link', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText('Home'));
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });
  it('Should redirect to "/about", by clicking on the about link', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText('About'));
    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });
  it('Should redirect to "/favorites", by clicking on the Favorite Pokemons link', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText('Favorite Pokémons'));
    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });
  it('Should to redirect to "Not Found", entering an unknown URL', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/error');
    const notFound = getByText(/not found/i);

    expect(notFound).toBeInTheDocument();
  });
});
