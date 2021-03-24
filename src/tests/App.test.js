import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
import { /* render, */ screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('1st Requisite: Test <App /> component', () => {
  it('checks if <App /> render at \'/\' path', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
  });

  it('renders a reading with the text `Pokédex`', () => {
    renderWithRouter(<App />);
    const heading = screen.getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('checks nav links', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    expect(links[0].innerHTML).toBe('Home');
    expect(links[1].innerHTML).toBe('About');
    expect(links[2].innerHTML).toBe('Favorite Pokémons');
  });

  it('checks if Home link renders home path', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/Home/));
    expect(history.location.pathname).toBe('/');
  });

  it('checks if About link renders about path', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/About/));
    expect(history.location.pathname).toBe('/about');
  });

  it('checks if Pokémons Favoritados link renders favorites path', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/Favorite Pokémons/));
    expect(history.location.pathname).toBe('/favorites');
  });

  it('checks if pushing a random url renders NotFound component', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau-smith');
    expect(screen.getByText(/Page requested not found/)).toBeInTheDocument();
  });
});
