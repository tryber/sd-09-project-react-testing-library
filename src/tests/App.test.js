import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('testing render of app', () => {
  it('should render heading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    const heading = getByText(/Pokédex/i);
    const home = getByText(/home/i);
    const about = getByText(/about/i);
    const favorites = getByText(/favorite pokémons/i);

    expect(heading).toBeInTheDocument();
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorites).toBeInTheDocument();
  });
});

describe('testing redirect after click in pathways', () => {
  it('should redirect to home', () => {
    const { getByText, history } = renderWithRouter(<App />);

    userEvent.click(getByText(/home/i));
    history.push('/');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  it('should redirect to home', () => {
    const { getByText, history } = renderWithRouter(<App />);

    userEvent.click(getByText(/about/i));
    history.push('/about');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  it('should redirect to favorites', () => {
    const { getByText, history } = renderWithRouter(<App />);
    userEvent.click(getByText(/favorite pokémons/i));
    history.push('/favorites');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });

  it('should redirect to not found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/xablau');
    const notFound = getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
