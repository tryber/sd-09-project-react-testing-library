import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requirement 1 - Testing component <App />', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('renders <Pokedex /> in root URL', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
  });

  test('checks the Links on top of the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const link1 = getByText('Home');
    const link2 = getByText('About');
    const link3 = getByText('Favorite Pokémons');

    expect(link1).toBeInTheDocument();
    expect(link2).toBeInTheDocument();
    expect(link3).toBeInTheDocument();
  });

  test('clicking Home should redirect to root URL', () => {
    const { history, getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('Home'));
    const pathName = history.location.pathname;
    expect(pathName).toBe('/');
  });

  test('clicking About should redirect to "/about"', () => {
    const { history, getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('About'));
    const pathName = history.location.pathname;
    expect(pathName).toBe('/about');
  });

  test('clicking Favorite Pokémons should redirect to "/favorites"', () => {
    const { history, getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('Favorite Pokémons'));
    const pathName = history.location.pathname;
    expect(pathName).toBe('/favorites');
  });

  test('tests if unknown page is correctly rendered', () => {
    const { history, getByText } = renderWithRouter(<App />);
    history.push('/digimonsdigitais');
    const notFoundText = getByText(/Page requested not found/i);
    expect(notFoundText).toBeInTheDocument();
    // console.log(notFoundText.textContent);
  });
});
