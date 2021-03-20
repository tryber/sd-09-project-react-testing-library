import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('First requirement, testing the App.js component', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('renders the main page on the path `/`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/');
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('have 3 navigation links on top of the page', () => {
    const { getByRole } = renderWithRouter(<App />);
    const home = getByRole('link', { name: 'Home' });
    const about = getByRole('link', { name: 'About' });
    const fav = getByRole('link', { name: 'Favorite Pokémons' });

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(fav).toBeInTheDocument();
  });
  // ** Source: https://github.com/tryber/sd-09-project-react-testing-library/pull/60/files */

  it('redirects to the initial page when button Home is clicekd', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const homeButton = getByRole('link', { name: 'Home' });
    fireEvent.click(homeButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('redirects to the About page when button About is clicekd', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const aboutButton = getByRole('link', { name: 'About' });
    fireEvent.click(aboutButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('redirects to the Favorite Pokémons page when button Favorite Pokémons is clicked',
    () => {
      const { getByRole, history } = renderWithRouter(<App />);
      const favoriteButton = getByRole('link', { name: 'Favorite Pokémons' });
      fireEvent.click(favoriteButton);
      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });

  it('redirects to the Not found page when a unknown path is given',
    () => {
      const { getByAltText, history } = renderWithRouter(<App />);
      history.push('/error');
      const notFoundImage = getByAltText(
        'Pikachu crying because the page requested was not found',
      );
      expect(notFoundImage).toBeInTheDocument();
    });
});
