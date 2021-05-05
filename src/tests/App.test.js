import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import RenderWithRouter from './RenderWithRouter';

describe('Component <App.js /> Test', () => {
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

  test('shows navBar with Home, About and Favorite Pokémons', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const home = getByText(/Home/i);
    expect(home).toBeInTheDocument();
    const about = getByText(/About/i);
    expect(about).toBeInTheDocument();
    const favPokemons = getByText(/Favorite Pokémons/i);
    expect(favPokemons).toBeInTheDocument();
  });

  test('navigation to home', () => {
    const { getByText, history } = RenderWithRouter(<App />);

    fireEvent.click(getByText(/Home/i));
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
    const pathName = history.location.pathname;
    expect(pathName).toBe('/');
  });

  test('navigation to about', () => {
    const { getByText, history } = RenderWithRouter(<App />);

    fireEvent.click(getByText(/About/i));
    expect(getByText('About Pokédex')).toBeInTheDocument();
    const pathName = history.location.pathname;
    expect(pathName).toBe('/about');
  });

  test('navigation to favorite pokemóns', () => {
    const { getByText, history } = RenderWithRouter(<App />);

    fireEvent.click(getByText(/Favorite Pokémons/i));
    expect(getByText('Favorite pokémons')).toBeInTheDocument();
    const pathName = history.location.pathname;
    expect(pathName).toBe('/favorites');
  });

  test('navigation to NotFound if unknown URL', () => {
    const { getByText, history } = RenderWithRouter(<App />);

    history.push('/qualquer/coisa');
    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
});
