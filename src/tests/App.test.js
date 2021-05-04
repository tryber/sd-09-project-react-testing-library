import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('Requirement 1: Component App tests', () => {
  it('Renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  it('Shows the Pokédex when the route is `/`', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
  it('Renders navigation links', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText(/Home/i)).toBeInTheDocument();
    expect(getByText(/About/i)).toBeInTheDocument();
    expect(getByText(/Favorite Pokémons/i)).toBeInTheDocument();
  });
  it('Redirects to `/` by clicking on the link `Home`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    userEvent.click(getByText(/Home/i));
    expect(history.location.pathname).toBe('/');
  });
  it('Redirects to `/about` by clicking on the link `About`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    userEvent.click(getByText(/About/i));
    expect(history.location.pathname).toBe('/about');
  });
  it('Redirects to `/favorites` by clicking on the link `Favorite Pokémons`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    userEvent.click(getByText(/Favorite Pokémons/i));
    expect(history.location.pathname).toBe('/favorites');
  });
  it('Renders `Page requested not found` text by typing invalid url', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/página-que-não-exite');
    expect(getByText(/Page requested not found/i)).toBeInTheDocument();
  });
});
