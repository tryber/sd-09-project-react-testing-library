import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Test App functionality', () => {
  test('Render Home when the app loads with "/"', () => {
    renderWithRouter(<App />);
    const app = screen.getByText(/Encountered pokémons/);
    expect(app).toBeInTheDocument();
  });
  test('Links set at the top (home, about, favorite Pokemons)', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByText(/Home/);
    const aboutLink = screen.getByText('About');
    const favoriteLink = screen.getByText(/Favorite/);
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });
  test('By clicking Home, is redirected to "/" path', () => {
    const { history } = renderWithRouter(<App />);
    const homeButton = screen.getByText('Home');
    fireEvent.click(homeButton);
    const pathName = history.location.pathname;
    expect(pathName).toBe(pathName);
  });
  test('By clicking About, is redirected to "/about" path', () => {
    const { history } = renderWithRouter(<App />);
    const aboutButton = screen.getByText('About');
    fireEvent.click(aboutButton);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/about');
  });
  test('By clicking Favorite Pokémon, ir redirected ti "/favorites" path', () => {
    const { history } = renderWithRouter(<App />);
    const favButton = screen.getByText(/Favorite/);
    fireEvent.click(favButton);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/favorites');
  });
  test('By looking for a unknown path, shows "Not found" message', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/unknownpath');
    const noFoundtMessage = screen.getByText(/Page requested/);
    expect(noFoundtMessage).toBeInTheDocument();
  });
});
