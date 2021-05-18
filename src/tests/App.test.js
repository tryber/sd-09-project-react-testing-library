import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test the <App.js /> component', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText(/Pokédex/i)).toBeInTheDocument();
  });

  test('the page is rendered by loading the application at the `/` URL', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  describe('The top of the application contains a set of navigation links', () => {
    it('first link must have the text `Home`', () => {
      renderWithRouter(<App />);
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('second link must have the text `About`', () => {
      renderWithRouter(<App />);
      expect(screen.getByText('About')).toBeInTheDocument();
    });

    it('third link must have the text `Favorite Pokémons`', () => {
      renderWithRouter(<App />);
      expect(screen.getByText(/Favorite Pokémons/i)).toBeInTheDocument();
    });
  });

  describe('Navigation text', () => {
    it('redirect to the home page by clicking on the Home link', () => {
      const { getByText, history } = renderWithRouter(<App />);
      userEvent.click(screen.getByText('Home'));
      expect(getByText(/encountered pokémons/i)).toBeInTheDocument();
      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });

    it('redirect to `/about` page by clicking on the About link', () => {
      const { getByText, history } = renderWithRouter(<App />);
      userEvent.click(screen.getByText('About'));
      expect(getByText(/about pokédex/i)).toBeInTheDocument();
      const { pathname } = history.location;
      expect(pathname).toBe('/about');
    });

    it('redirect to `/favorites` page by clicking on the Favorite Pokémons link', () => {
      const { getByText, history } = renderWithRouter(<App />);
      userEvent.click(screen.getByText(/favorite pokémons/i));
      expect(getByText(/Favorite pokémons/)).toBeInTheDocument();
      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });

    it('redirect to `not found` page when entering an unknown URL', () => {
      const { getByText, history } = renderWithRouter(<App />);
      history.push('404');
      expect(getByText(/Page requested not found/i)).toBeInTheDocument();
    });
  });
});
